import { BaseFlutterAgent } from "./base-agent.js";
import { FlutterPlatform } from "../types.js";

export interface FlutterCicdSpec {
  projectName: string;
  targetPlatforms: FlutterPlatform[];
  enableSplitPerAbiApk?: boolean;
  enableWindowsMsix?: boolean;
  enableFastlane?: boolean;
  enableWebDeploy?: boolean;
  androidPackageName?: string;
}

export interface FlutterCicdResult {
  githubActionsYaml: string;
  keystoreSetupScriptPs1: string;
  keystoreSetupScriptSh: string;
  androidSigningGradleKts: string;
  msixPubspecConfig: string;
  fastfile?: string;
  summary: string;
}

export class FlutterCicdSpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterCicdSpecialistAgent",
      "CI/CD, Release & Packaging Engineer",
      "Generates production GitHub Actions for Split-per-ABI signed APKs, automated gh secret setup, Windows MSIX test signing, and Fastlane."
    );
  }

  public generateCicd(spec: FlutterCicdSpec): FlutterCicdResult {
    this.log("INFO", `Generating advanced CI/CD automation for Flutter project: ${spec.projectName}`);

    const isIos = spec.targetPlatforms.includes("ios");
    const isAndroid = spec.targetPlatforms.includes("android") || spec.enableSplitPerAbiApk !== false;
    const isWindows = spec.targetPlatforms.includes("windows") || spec.enableWindowsMsix !== false;
    const isWeb = spec.targetPlatforms.includes("web");
    const packageName = spec.androidPackageName || `com.example.${spec.projectName.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

    const githubActionsYaml = `name: Flutter CI/CD Release Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  test-and-lint:
    name: Flutter Analyze & Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Setup Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.27.x'
          channel: 'stable'
          cache: true

      - name: Install Dependencies
        run: flutter pub get

      - name: Analyze Project
        run: flutter analyze

      - name: Run Tests with Coverage
        run: flutter test --coverage

      - name: Upload Test Coverage
        uses: actions/upload-artifact@v4
        with:
          name: lcov-report
          path: coverage/lcov.info

  ${isAndroid ? `android-build:
    name: Build Signed Android APKs (Split per ABI)
    needs: test-and-lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Java 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Setup Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.27.x'
          channel: 'stable'
          cache: true

      - name: Decode Release Keystore from Secrets
        env:
          KEYSTORE_BASE64: \${{ secrets.ANDROID_KEYSTORE_BASE64 }}
        if: env.KEYSTORE_BASE64 != ''
        run: |
          mkdir -p android/app
          echo "$KEYSTORE_BASE64" | base64 --decode > android/app/release.jks

      - name: Install Dependencies
        run: flutter pub get

      - name: Build Split-per-ABI Release APKs
        env:
          KEYSTORE_PATH: release.jks
          KEYSTORE_PASSWORD: \${{ secrets.ANDROID_KEYSTORE_PASSWORD }}
          KEY_ALIAS: \${{ secrets.ANDROID_KEY_ALIAS }}
          KEY_PASSWORD: \${{ secrets.ANDROID_KEY_PASSWORD }}
        run: |
          flutter build apk --split-per-abi --release

      - name: Upload Split APK Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: android-split-apks
          path: build/app/outputs/flutter-apk/*.apk` : ""}

  ${isWindows ? `windows-msix-build:
    name: Build & Sign Windows MSIX Package
    needs: test-and-lint
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.27.x'
          channel: 'stable'
          cache: true

      - name: Enable Windows Desktop Support
        run: flutter config --enable-windows-desktop

      - name: Install Dependencies
        run: flutter pub get

      - name: Build Windows Desktop Release
        run: flutter build windows --release

      - name: Generate Self-Signed Test Certificate & Package MSIX
        shell: pwsh
        run: |
          # Create Custom Self-Signed Code-Signing Certificate
          $cert = New-SelfSignedCertificate \
            -Type Custom \
            -Subject "CN=${spec.projectName}, O=Dev, C=US" \
            -KeyUsage DigitalSignature \
            -FriendlyName "${spec.projectName} Test Certificate" \
            -CertStoreLocation "Cert:\\CurrentUser\\My" \
            -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.3", "2.5.29.19={text}")
          
          $pwd = ConvertTo-SecureString -String "TestPassword123" -Force -AsPlainText
          Export-PfxCertificate -Cert $cert -FilePath "test_cert.pfx" -Password $pwd
          
          # Package and sign MSIX
          dart run msix:create --certificate-path test_cert.pfx --certificate-password TestPassword123

      - name: Upload Windows MSIX Artifact
        uses: actions/upload-artifact@v4
        with:
          name: windows-msix-package
          path: build/windows/x64/runner/Release/*.msix` : ""}

  ${isIos ? `ios-build:
    name: Build iOS Release
    needs: test-and-lint
    runs-on: macos-14
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.27.x'
          channel: 'stable'
          cache: true
      - run: flutter pub get
      - name: Build iOS
        run: flutter build ios --release --no-codesign` : ""}

  ${isWeb ? `web-build:
    name: Build Flutter Web (WASM / CanvasKit)
    needs: test-and-lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.27.x'
          channel: 'stable'
          cache: true
      - run: flutter pub get
      - name: Build Web WASM
        run: flutter build web --wasm --release
      - name: Upload Web Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: web-release
          path: build/web/` : ""}
`;

    const keystoreSetupScriptPs1 = `# PowerShell Helper: Generate Release Keystore and Set GitHub Secrets via 'gh' CLI
$keystoreFile = "android/app/release.jks"
$alias = "upload"
$password = [System.Guid]::NewGuid().ToString("N").Substring(0, 16)

Write-Host ">>> Generating local release keystore: $keystoreFile..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "android/app" | Out-Null

keytool -genkey -v \
  -keystore $keystoreFile \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -alias $alias \
  -storepass $password \
  -keypass $password \
  -dname "CN=${spec.projectName}, OU=Mobile, O=Development, L=City, S=State, C=US"

$base64Keystore = [Convert]::ToBase64String([IO.File]::ReadAllBytes((Resolve-Path $keystoreFile)))

Write-Host ">>> Setting GitHub Secrets via 'gh secret set'..." -ForegroundColor Green
$base64Keystore | gh secret set ANDROID_KEYSTORE_BASE64
$password | gh secret set ANDROID_KEYSTORE_PASSWORD
$alias | gh secret set ANDROID_KEY_ALIAS
$password | gh secret set ANDROID_KEY_PASSWORD

Write-Host "✅ All 4 Android Keystore secrets uploaded to GitHub repository!" -ForegroundColor Green
`;

    const keystoreSetupScriptSh = `#!/usr/bin/env bash
# Bash Helper: Generate Release Keystore and Set GitHub Secrets via 'gh' CLI
mkdir -p android/app
KEYSTORE_FILE="android/app/release.jks"
ALIAS="upload"
PASSWORD=$(openssl rand -hex 12)

echo ">>> Generating local release keystore: $KEYSTORE_FILE..."
keytool -genkey -v \
  -keystore "$KEYSTORE_FILE" \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -alias "$ALIAS" \
  -storepass "$PASSWORD" \
  -keypass "$PASSWORD" \
  -dname "CN=${spec.projectName}, OU=Mobile, O=Development, L=City, S=State, C=US"

BASE64_KEYSTORE=$(base64 -w 0 "$KEYSTORE_FILE" 2>/dev/null || base64 "$KEYSTORE_FILE")

echo ">>> Setting GitHub Secrets via 'gh secret set'..."
echo "$BASE64_KEYSTORE" | gh secret set ANDROID_KEYSTORE_BASE64
echo "$PASSWORD" | gh secret set ANDROID_KEYSTORE_PASSWORD
echo "$ALIAS" | gh secret set ANDROID_KEY_ALIAS
echo "$PASSWORD" | gh secret set ANDROID_KEY_PASSWORD

echo "✅ All 4 Android Keystore secrets uploaded to GitHub repository!"
`;

    const androidSigningGradleKts = `// In android/app/build.gradle or build.gradle.kts:
android {
    namespace = "${packageName}"

    signingConfigs {
        create("release") {
            val keystorePath = System.getenv("KEYSTORE_PATH") ?: "release.jks"
            storeFile = file(keystorePath)
            storePassword = System.getenv("KEYSTORE_PASSWORD")
            keyAlias = System.getenv("KEY_ALIAS")
            keyPassword = System.getenv("KEY_PASSWORD")
        }
    }

    buildTypes {
        release {
            signingConfig = signingConfigs.getByName("release")
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
}
`;

    const msixPubspecConfig = `# Add to pubspec.yaml for Windows MSIX Packaging:
dev_dependencies:
  msix: ^3.16.8

msix_config:
  display_name: "${spec.projectName}"
  publisher_display_name: "Development"
  identity_name: "com.example.${spec.projectName.toLowerCase()}"
  msix_version: 1.0.0.0
  logo_path: assets/icons/app_icon.png
  capabilities:
    - internetClient
`;

    const fastfile = spec.enableFastlane ? `# Fastlane Release Automation for iOS & Android
default_platform(:ios)

platform :ios do
  desc "Push a new beta build to TestFlight"
  lane :beta do
    match(type: "appstore")
    build_app(workspace: "Runner.xcworkspace", scheme: "Runner")
    upload_to_testflight
  end
end

platform :android do
  desc "Deploy a new version to Google Play Internal track"
  lane :internal do
    gradle(task: "bundleRelease")
    upload_to_play_store(track: 'internal')
  end
end
` : undefined;

    const summary = `Generated CI/CD pipeline with Split-per-ABI signed APKs, 'gh secret set' automated keystore script, and Windows MSIX test-cert signing.`;

    return {
      githubActionsYaml,
      keystoreSetupScriptPs1,
      keystoreSetupScriptSh,
      androidSigningGradleKts,
      msixPubspecConfig,
      fastfile,
      summary
    };
  }
}
