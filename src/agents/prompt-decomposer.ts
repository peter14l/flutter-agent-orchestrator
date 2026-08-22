import { BaseFlutterAgent } from "./base-agent.js";
import { FlutterArchitecturePlan, FlutterPlatform, FlutterStateManagement, FlutterArchitecture, FeatureSpec, PlatformCheckResult } from "../types.js";

export class FlutterPromptDecomposerAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterPromptArchitectAgent",
      "Lead Flutter Solutions Architect & Requirements Decomposer",
      "Deconstructs Flutter project prompts, validates target platforms (iOS, Android, Web, Desktop), and builds Clean Architecture feature blueprints."
    );
  }

  public detectPlatforms(prompt: string, explicitPlatforms?: FlutterPlatform[]): PlatformCheckResult {
    if (explicitPlatforms && explicitPlatforms.length > 0) {
      return {
        isPlatformSpecified: true,
        detectedPlatforms: explicitPlatforms,
        recommendedOptions: ["ios", "android", "web", "macos", "windows", "linux"]
      };
    }

    const p = prompt.toLowerCase();
    const detected: FlutterPlatform[] = [];

    if (p.includes("android")) detected.push("android");
    if (p.includes("ios") || p.includes("iphone") || p.includes("ipad") || p.includes("apple")) detected.push("ios");
    if (p.includes("web") || p.includes("browser") || p.includes("wasm")) detected.push("web");
    if (p.includes("macos") || p.includes("mac os")) detected.push("macos");
    if (p.includes("windows") || p.includes("win32") || p.includes("win64")) detected.push("windows");
    if (p.includes("linux") || p.includes("ubuntu")) detected.push("linux");
    if (p.includes("desktop")) {
      if (!detected.includes("macos")) detected.push("macos");
      if (!detected.includes("windows")) detected.push("windows");
      if (!detected.includes("linux")) detected.push("linux");
    }
    if (p.includes("mobile")) {
      if (!detected.includes("android")) detected.push("android");
      if (!detected.includes("ios")) detected.push("ios");
    }
    if (p.includes("cross-platform") || p.includes("all platforms")) {
      return {
        isPlatformSpecified: true,
        detectedPlatforms: ["android", "ios", "web", "macos", "windows", "linux"],
        recommendedOptions: ["android", "ios", "web", "macos", "windows", "linux"]
      };
    }

    if (detected.length > 0) {
      return {
        isPlatformSpecified: true,
        detectedPlatforms: detected,
        recommendedOptions: ["android", "ios", "web", "macos", "windows", "linux"]
      };
    }

    // Platforms NOT specified: generate clarification prompt
    return {
      isPlatformSpecified: false,
      detectedPlatforms: [],
      clarificationMessage: `🎯 Target Platforms Required:
Before starting execution, please specify which platform(s) you are targeting for this Flutter app:
1. 📱 Mobile: iOS & Android (Default)
2. 🌐 Web (Responsive WASM / HTML)
3. 💻 Desktop: macOS, Windows, Linux
4. 🚀 All Platforms (Mobile, Web, Desktop)

Please reply with your target platform choice to generate platform-specific configurations, permissions, and responsive layouts.`,
      recommendedOptions: ["android", "ios", "web", "macos", "windows", "linux"]
    };
  }

  public decompose(
    prompt: string,
    targetPlatforms?: FlutterPlatform[],
    projectName: string = "flutter_app",
    stateManagement: FlutterStateManagement = "riverpod",
    architecturePattern: FlutterArchitecture = "feature-first-clean-architecture"
  ): FlutterArchitecturePlan {
    const platformCheck = this.detectPlatforms(prompt, targetPlatforms);

    if (!platformCheck.isPlatformSpecified) {
      this.log("WARN", `Target platforms not specified for "${projectName}". Requesting user clarification.`);
      return {
        projectName,
        targetPlatforms: [],
        stateManagement,
        architecturePattern,
        needsPlatformClarification: true,
        platformClarificationPrompt: platformCheck.clarificationMessage,
        summary: `Platform clarification required before project decomposition. Please specify target platforms.`,
        folderStructure: [],
        features: [],
        executionPhases: [],
        concurrencyAndStateStrategy: "",
        routingStrategy: ""
      };
    }

    const platforms = platformCheck.detectedPlatforms;
    this.log("INFO", `Decomposing Flutter prompt for ${projectName} on platforms: [${platforms.join(", ")}]`);

    const pLower = prompt.toLowerCase();
    const isAuth = pLower.includes("auth") || pLower.includes("login") || pLower.includes("user") || pLower.includes("signup");
    const isStorage = pLower.includes("db") || pLower.includes("database") || pLower.includes("offline") || pLower.includes("cache") || pLower.includes("sqlite") || pLower.includes("drift");
    const isNetwork = pLower.includes("api") || pLower.includes("fetch") || pLower.includes("rest") || pLower.includes("http") || pLower.includes("supabase") || pLower.includes("firebase");
    const isRealtime = pLower.includes("chat") || pLower.includes("stream") || pLower.includes("realtime") || pLower.includes("socket");

    const features: FeatureSpec[] = [];

    // Core / Foundation Feature
    features.push({
      id: "FEAT-001",
      name: "Core Theme, Design System & App Router",
      description: "Material 3 theme configuration, light/dark mode, typography, GoRouter navigation hierarchy, and base error handling.",
      platforms,
      priority: "P0-Critical",
      layer: "core",
      dependencies: [],
      components: ["app_theme.dart", "app_colors.dart", "app_router.dart", "app_typography.dart", "failure.dart"],
      acceptanceCriteria: [
        "Material 3 dynamic color scheme and typography applied",
        "Declarative GoRouter setup with type-safe routing and redirect guards",
        "Adaptive Scaffold supporting responsive mobile, web, and desktop viewports"
      ]
    });

    if (isAuth) {
      features.push({
        id: "FEAT-002",
        name: "Authentication & Session Management",
        description: "User authentication state, token persistence with flutter_secure_storage/shared_preferences, login/register UI.",
        platforms,
        priority: "P0-Critical",
        layer: "domain",
        dependencies: ["FEAT-001"],
        components: ["auth_controller.dart", "auth_repository.dart", "auth_state.dart", "login_screen.dart", "user_entity.dart"],
        acceptanceCriteria: [
          "Reactive AuthState provider redirecting unauthenticated users to /login",
          "Encrypted token storage with biometric / keychain support where supported",
          "Responsive login form with form validation and loading overlay"
        ]
      });
    }

    if (isNetwork || isStorage) {
      features.push({
        id: "FEAT-003",
        name: "Data Layer & Offline-First Repository",
        description: "Network client (Dio/Supabase) with caching, local database (Drift/Hive), and single source of truth repositories.",
        platforms,
        priority: "P1-High",
        layer: "data",
        dependencies: ["FEAT-001"],
        components: ["api_client.dart", "local_database.dart", "data_repository_impl.dart", "network_interceptor.dart"],
        acceptanceCriteria: [
          "Automatic retry with exponential backoff on transient network failures",
          "Offline cache synchronization emitting reactive Dart Streams/AsyncValue",
          "Structured error handling with Left(Failure) / Right(T) or Result types"
        ]
      });
    }

    // Main Feature
    features.push({
      id: "FEAT-004",
      name: "Primary Feature Domain & Interactive Dashboard",
      description: `Core domain logic and interactive UI flow for: "${prompt.slice(0, 100)}..."`,
      platforms,
      priority: "P0-Critical",
      layer: "presentation",
      dependencies: ["FEAT-001", isNetwork ? "FEAT-003" : ""].filter(Boolean),
      components: ["dashboard_screen.dart", "dashboard_controller.dart", "dashboard_state.dart", "custom_widgets.dart"],
      acceptanceCriteria: [
        "State management using Riverpod AsyncNotifier / BLoC with zero unnecessary rebuilds",
        "Fluid animations with flutter_animate and 60/120fps smooth scrolling",
        "Const constructors used throughout widget trees for minimal garbage collection"
      ]
    });

    if (isRealtime) {
      features.push({
        id: "FEAT-005",
        name: "Realtime Stream & Push Event Engine",
        description: "WebSocket / Supabase realtime channels or SSE client for live data updates.",
        platforms,
        priority: "P1-High",
        layer: "domain",
        dependencies: ["FEAT-001", "FEAT-004"],
        components: ["realtime_service.dart", "stream_provider.dart", "live_data_widget.dart"],
        acceptanceCriteria: [
          "StreamProvider lifecycle bound to active widget tree with autoDispose",
          "Automatic reconnection handling with connection state indicator"
        ]
      });
    }

    // QA & Testing Suite
    features.push({
      id: "FEAT-006",
      name: "Automated QA & Unit/Widget Test Suite",
      description: "Unit tests with mocktail, widget tests with flutter_test, and integration test setup.",
      platforms,
      priority: "P1-High",
      layer: "test",
      dependencies: ["FEAT-001", "FEAT-004"],
      components: ["controller_test.dart", "repository_test.dart", "screen_widget_test.dart"],
      acceptanceCriteria: [
        "Controllers tested with provider container overrides / blocTest",
        "Widget tests verifying user interactions, text fields, and tap callbacks",
        "Zero flakiness with pumpAndSettle synchronization"
      ]
    });

    const folderStructure = [
      { path: "lib/core/theme/", description: "Material 3 color palette, typography, and dark mode rules" },
      { path: "lib/core/router/", description: "GoRouter routing declarations and auth guards" },
      { path: "lib/core/errors/", description: "Failure sealed classes and exception handlers" },
      { path: "lib/features/main/presentation/", description: "Flutter UI screens, widgets, and Riverpod/Bloc state holders" },
      { path: "lib/features/main/domain/", description: "Domain entities, repository interfaces, and use cases" },
      { path: "lib/features/main/data/", description: "Data sources, DTO mappers, and repository implementations" },
      { path: "test/unit/", description: "Unit tests for state notifiers and repositories" },
      { path: "test/widget/", description: "Widget tests using testWidgets and pumpWidget" }
    ];

    const executionPhases = [
      {
        phase: 1,
        title: "Phase 1: Project Scaffolding & Core Architecture",
        description: "Generate pubspec.yaml, analysis_options.yaml, Material 3 theme, and GoRouter foundation.",
        features: ["FEAT-001"]
      },
      {
        phase: 2,
        title: "Phase 2: Data Models & Business Logic Engine",
        description: "Implement repositories, API clients, local caching, and state notifiers.",
        features: isAuth ? ["FEAT-002", "FEAT-003"] : ["FEAT-003"]
      },
      {
        phase: 3,
        title: "Phase 3: Presentation Layer & Responsive Widgets",
        description: "Build reactive Flutter UI with ConsumerWidget/BlocBuilder, adaptive layouts, and animations.",
        features: ["FEAT-004", isRealtime ? "FEAT-005" : ""].filter(Boolean)
      },
      {
        phase: 4,
        title: "Phase 4: QA Testing, Linting & Multi-Platform Validation",
        description: "Execute flutter test, analyze with flutter_lints, and verify on target platforms.",
        features: ["FEAT-006"]
      }
    ];

    return {
      projectName,
      targetPlatforms: platforms,
      stateManagement,
      architecturePattern,
      needsPlatformClarification: false,
      summary: `Clean Architecture blueprint for "${projectName}" targeting [${platforms.join(", ")}] with ${stateManagement.toUpperCase()}. Deconstructed into ${features.length} modular, testable features.`,
      folderStructure,
      features,
      executionPhases,
      concurrencyAndStateStrategy: "Reactive state management using Riverpod (AsyncNotifier / AsyncValue) with autoDispose to prevent memory leaks and Dart Isolates for heavy background parsing.",
      routingStrategy: "Declarative type-safe routing with GoRouter supporting deep linking, shell routes, and platform-specific back button handling."
    };
  }
}
