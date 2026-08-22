export const FLUTTER_MCP_PROMPTS = [
    {
        name: "flutter-prompt-architect",
        description: "Deconstructs Flutter requirements into Clean Architecture modules, checking target platforms (iOS/Android/Web/Desktop) first.",
        arguments: [
            { name: "requirement", description: "The product prompt or requirements text", required: true },
            { name: "platforms", description: "Target platforms (e.g. 'ios, android, web')", required: false }
        ],
        template: (args) => `You are the Lead Flutter Solutions Architect. First verify target platforms (iOS, Android, Web, Desktop). Then break down the following requirement into Clean Architecture features, GoRouter navigation, and phased sprints:\n\nPlatforms: ${args.platforms || "Unspecified (Must confirm)"}\nRequirement:\n${args.requirement}`
    },
    {
        name: "flutter-ui-designer",
        description: "Designs modern Flutter Material 3 responsive widgets with Riverpod/Bloc state integration.",
        arguments: [
            { name: "screen", description: "Screen name and widget layout description", required: true }
        ],
        template: (args) => `You are the Flutter UI/UX & Widget Engineer. Design a production-grade responsive ConsumerWidget/BlocBuilder screen with Material 3 and animations for:\n${args.screen}`
    },
    {
        name: "flutter-dependency-researcher",
        description: "Researches latest compatible pub.dev packages and outputs standard pubspec.yaml and analysis_options.yaml.",
        arguments: [
            { name: "packages", description: "Comma-separated package names or features", required: false },
            { name: "stateManagement", description: "State management system (riverpod, bloc)", required: false }
        ],
        template: (args) => `You are the Pub.dev & Flutter Ecosystem Researcher. Generate a standard pubspec.yaml compatible with Dart 3.6+ and Flutter 3.27+ with ${args.stateManagement || "riverpod"} and packages: ${args.packages || "standard set"}.`
    },
    {
        name: "flutter-error-doctor",
        description: "Diagnoses RenderFlex overflows, setState during build, pubspec conflicts, and CocoaPods build failures.",
        arguments: [
            { name: "error", description: "The error message or crash log", required: true }
        ],
        template: (args) => `You are the Flutter & Dart Diagnostic Doctor. Diagnose the following failure and provide root cause analysis and exact code fixes:\n${args.error}`
    },
    {
        name: "flutter-test-specialist",
        description: "Generates Unit tests and Widget tests using testWidgets and mocktail.",
        arguments: [
            { name: "classToTest", description: "Name of the widget or controller to test", required: true }
        ],
        template: (args) => `You are the Flutter QA & Test Automation Specialist. Generate comprehensive Unit & Widget tests with mocktail for:\n${args.classToTest}`
    },
    {
        name: "flutter-master-orchestrator",
        description: "Coordinates all Flutter agents end-to-end (Platform confirmation -> Decomposition -> Pubspec -> UI -> State -> Tests).",
        arguments: [
            { name: "projectPrompt", description: "Complete application description", required: true },
            { name: "targetPlatforms", description: "Target platforms (ios, android, web, macos, windows, linux)", required: false }
        ],
        template: (args) => `You are the Master Flutter Multi-Agent Orchestrator. Execute the full end-to-end pipeline for: ${args.projectPrompt}. Note: Always ensure target platforms (${args.targetPlatforms || "Unspecified"}) are confirmed before building.`
    }
];
//# sourceMappingURL=agent-prompts.js.map