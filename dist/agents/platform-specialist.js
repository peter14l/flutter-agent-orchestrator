import { BaseFlutterAgent } from "./base-agent.js";
export class FlutterPlatformSpecialistAgent extends BaseFlutterAgent {
    constructor() {
        super("FlutterPlatformSpecialistAgent", "Native Platform Permissions & Security Engineer", "Configures iOS/macOS Info.plist permission strings, AndroidManifest.xml permissions, and Web WASM CanvasKit optimizations.");
    }
    generateConfig(spec) {
        this.log("INFO", `Configuring native platform permissions for: ${spec.projectName} [Platforms: ${spec.targetPlatforms.join(", ")}]`);
        const infoPlistXml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDisplayName</key>
    <string>${spec.projectName}</string>
    <key>CFBundleIdentifier</key>
    <string>com.example.${spec.projectName.toLowerCase()}</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>

    <!-- Platform Permissions -->
    ${spec.permissions.includes("camera") ? `<key>NSCameraUsageDescription</key>\n    <string>Requires camera access to capture photos and scan documents.</string>` : ""}
    ${spec.permissions.includes("location") ? `<key>NSLocationWhenInUseUsageDescription</key>\n    <string>Requires location access to provide location-based services.</string>` : ""}
    ${spec.permissions.includes("photos") ? `<key>NSPhotoLibraryUsageDescription</key>\n    <string>Requires photo library access to upload images.</string>` : ""}
    ${spec.permissions.includes("microphone") ? `<key>NSMicrophoneUsageDescription</key>\n    <string>Requires microphone access for audio recording.</string>` : ""}
    ${spec.permissions.includes("bluetooth") ? `<key>NSBluetoothAlwaysUsageDescription</key>\n    <string>Requires bluetooth to connect to external devices.</string>` : ""}
</dict>
</plist>
`;
        const androidManifestXml = `<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    ${spec.permissions.includes("camera") ? `<uses-permission android:name="android.permission.CAMERA" />` : ""}
    ${spec.permissions.includes("location") ? `<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />\n    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />` : ""}
    ${spec.permissions.includes("photos") ? `<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />` : ""}
    ${spec.permissions.includes("notifications") ? `<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />` : ""}

    <application
        android:label="${spec.projectName}"
        android:name="\${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>
</manifest>
`;
        const webIndexHtml = `<!DOCTYPE html>
<html>
<head>
  <base href="$FLUTTER_BASE_HREF">
  <meta charset="UTF-8">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta name="description" content="${spec.projectName} Flutter Web App">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <title>${spec.projectName}</title>
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <script src="flutter_bootstrap.js" async></script>
</body>
</html>
`;
        const summary = `Generated native platform configuration: iOS Info.plist, Android AndroidManifest.xml, and Web WASM bootstrap.`;
        return {
            infoPlistXml,
            androidManifestXml,
            webIndexHtml,
            summary
        };
    }
}
//# sourceMappingURL=platform-specialist.js.map