export interface FlutterMcpResourceDefinition {
  uri: string;
  name: string;
  mimeType: string;
  description: string;
  text: string;
}

export const FLUTTER_MCP_RESOURCES: FlutterMcpResourceDefinition[] = [
  {
    uri: "flutter://templates/pubspec.yaml",
    name: "Standard Flutter 3.27+ Clean Architecture pubspec.yaml",
    mimeType: "text/yaml",
    description: "Production-ready pubspec.yaml with Riverpod 2.x, Dio, GoRouter, flutter_animate, and testing packages.",
    text: `name: flutter_app
description: "A production-grade Flutter application built with Clean Architecture."
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ^3.6.0
  flutter: ">=3.27.0"

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.6.1
  riverpod_annotation: ^2.6.1
  dio: ^5.8.0+1
  go_router: ^14.8.0
  flutter_animate: ^4.5.2
  cached_network_image: ^3.4.1
  gap: ^3.0.1
  shared_preferences: ^2.5.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^5.0.0
  riverpod_generator: ^2.6.3
  build_runner: ^2.4.15
  mocktail: ^1.0.4
  custom_lint: ^0.7.0
  riverpod_lint: ^2.6.3

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
`
  },
  {
    uri: "flutter://architecture/clean-architecture-rules",
    name: "Flutter Clean Architecture & Performance Guidelines",
    mimeType: "text/markdown",
    description: "Design rules and best practices for Flutter & Dart applications.",
    text: `# Flutter Clean Architecture & Performance Guidelines

1. **Platform Awareness**: Always verify and configure platform-specific permissions (Info.plist for iOS/macOS, AndroidManifest.xml for Android, web headers for WASM).
2. **Const Constructors**: Use \`const\` constructors everywhere possible to reduce widget rebuild overhead and enable Flutter engine caching.
3. **Unidirectional Data Flow**: Presentation layer observes \`ref.watch(provider)\` and triggers business actions via \`ref.read(provider.notifier)\`.
4. **Auto-Disposal**: Use \`autoDispose\` on providers and explicitly close all controllers (\`TextEditingController\`, \`ScrollController\`) inside \`dispose()\`.
5. **No Async in build()**: Never execute asynchronous futures or side-effects directly in \`build()\` without a post-frame callback or lifecycle listener.
`
  }
];
