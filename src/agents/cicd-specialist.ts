import { BaseFlutterAgent } from "./base-agent.js";
import { FlutterPlatform } from "../types.js";

export interface FlutterCicdSpec {
  projectName: string;
  targetPlatforms: FlutterPlatform[];
  enableFastlane: boolean;
  enableWebDeploy: boolean;
}

export interface FlutterCicdResult {
  githubActionsYaml: string;
  fastfile?: string;
  summary: string;
}

export class FlutterCicdSpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterCicdSpecialistAgent",
      "CI/CD & Release Automation Engineer",
      "Generates production GitHub Actions workflows for Flutter, Fastlane deployment for iOS/Android, and Web WASM hosting."
    );
  }

  public generateCicd(spec: FlutterCicdSpec): FlutterCicdResult {
    this.log("INFO", `Generating CI/CD automation for Flutter project: ${spec.projectName}`);

    const isIos = spec.targetPlatforms.includes("ios");
    const isAndroid = spec.targetPlatforms.includes("android");
    const isWeb = spec.targetPlatforms.includes("web");

    const githubActionsYaml = `name: Flutter CI/CD Multi-Platform Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    name: Flutter Analyze & Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

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

      ${isAndroid ? `- name: Build Android App Bundle (AAB)
        run: flutter build appbundle --release` : ""}

      ${isWeb ? `- name: Build Flutter Web (WASM / CanvasKit)
        run: flutter build web --wasm --release` : ""}

  ${isIos ? `ios-build:
    name: Build iOS IPA
    needs: test
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

    const summary = `Generated Flutter CI/CD pipeline: Multi-platform GitHub Actions workflow, test coverage verification, and Fastlane release lanes.`;

    return {
      githubActionsYaml,
      fastfile,
      summary
    };
  }
}
