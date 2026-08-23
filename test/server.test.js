import test from "node:test";
import assert from "node:assert";
import { FlutterPromptDecomposerAgent } from "../dist/agents/prompt-decomposer.js";
import { FlutterDependencyResearcherAgent } from "../dist/agents/dependency-researcher.js";
import { FlutterUISpecialistAgent } from "../dist/agents/ui-specialist.js";
import { FlutterBackendSpecialistAgent } from "../dist/agents/backend-specialist.js";
import { FlutterErrorDiagnosticianAgent } from "../dist/agents/error-diagnostician.js";
import { FlutterTestingSpecialistAgent } from "../dist/agents/testing-specialist.js";
import { FlutterMasterOrchestratorAgent } from "../dist/agents/master-orchestrator.js";
import { handleAuditFlutterCode } from "../dist/tools/code-audit-tool.js";
import { FlutterBridgeSpecialistAgent } from "../dist/agents/bridge-specialist.js";
import { FlutterPlatformSpecialistAgent } from "../dist/agents/platform-specialist.js";
import { FlutterCicdSpecialistAgent } from "../dist/agents/cicd-specialist.js";
import { FlutterGoldenTestSpecialistAgent } from "../dist/agents/golden-test-specialist.js";
import { FlutterAiSpecialistAgent } from "../dist/agents/ai-specialist.js";
import { FlutterSecuritySpecialistAgent } from "../dist/agents/security-specialist.js";
import { FlutterDatabaseSpecialistAgent } from "../dist/agents/database-specialist.js";
import { FlutterLocalizationSpecialistAgent } from "../dist/agents/localization-specialist.js";
import { FlutterObservabilitySpecialistAgent } from "../dist/agents/observability-specialist.js";
import { FlutterDeepLinkSpecialistAgent } from "../dist/agents/deeplink-specialist.js";
import { FlutterAccessibilitySpecialistAgent } from "../dist/agents/accessibility-specialist.js";
import { FlutterMockFactorySpecialistAgent } from "../dist/agents/mock-factory-specialist.js";
import { FlutterAuthFlowSpecialistAgent } from "../dist/agents/auth-flow-specialist.js";
import { FlutterChartsSpecialistAgent } from "../dist/agents/charts-specialist.js";
import { FlutterOfflineResilienceSpecialistAgent } from "../dist/agents/offline-resilience-specialist.js";
import { FlutterDocBlueprintSpecialistAgent } from "../dist/agents/doc-blueprint-specialist.js";

test("FlutterPromptDecomposerAgent asks for platforms if not specified in prompt", () => {
  const agent = new FlutterPromptDecomposerAgent();
  const result = agent.decompose("Build a fitness tracking app with workout plans and calorie counter");

  assert.strictEqual(result.needsPlatformClarification, true);
  assert.ok(result.platformClarificationPrompt?.includes("Target Platforms Required"));
  assert.strictEqual(result.features.length, 0);
});

test("FlutterPromptDecomposerAgent decomposes smoothly when platforms are provided", () => {
  const agent = new FlutterPromptDecomposerAgent();
  const result = agent.decompose("Build a fitness tracking app with workout plans", ["android", "ios"]);

  assert.strictEqual(result.needsPlatformClarification, false);
  assert.ok(result.features.length >= 3);
  assert.deepStrictEqual(result.targetPlatforms, ["android", "ios"]);
});

test("FlutterDependencyResearcherAgent generates valid pubspec.yaml", async () => {
  const agent = new FlutterDependencyResearcherAgent();
  const { pubspec } = await agent.researchAndGeneratePubspec("fit_tracker", ["android", "ios"], "riverpod");

  assert.ok(pubspec.pubspecYaml.includes("flutter_riverpod"));
  assert.ok(pubspec.pubspecYaml.includes("go_router"));
  assert.ok(pubspec.analysisOptionsYaml.includes("prefer_const_constructors"));
});

test("FlutterUISpecialistAgent creates responsive Material 3 ConsumerWidget with archetype detection", () => {
  const agent = new FlutterUISpecialistAgent();
  const result = agent.designScreen({
    screenName: "WorkoutDashboardScreen",
    targetPlatforms: ["android", "ios", "web"],
    stateManagement: "riverpod",
    layoutDescription: "Dashboard showing daily workout routine, progress ring, and log workout button"
  });

  assert.ok(result.widgetCode.includes("WorkoutDashboardScreen"));
  assert.ok(result.widgetCode.includes("LayoutBuilder"));
  assert.ok(result.stateHolderCode.includes("WorkoutDashboardController"));
  assert.ok(result.modelCode.includes("WorkoutDashboardWorkout"));
  assert.ok(result.widgetCode.includes("surfaceContainer"));
  assert.ok(!result.widgetCode.includes("BackdropFilter"));
});

test("FlutterUISpecialistAgent only enables glassmorphism when explicitly requested", () => {
  const agent = new FlutterUISpecialistAgent();
  const result = agent.designScreen({
    screenName: "GlassWalletScreen",
    targetPlatforms: ["ios", "android"],
    stateManagement: "riverpod",
    layoutDescription: "Modern crypto wallet with frosted glass glassmorphism cards and blur effect"
  });

  assert.strictEqual(agent.hasGlassmorphism("frosted glass glassmorphism"), true);
  assert.ok(result.explanation.includes("Glassmorphism active via explicit prompt"));
});

test("FlutterBackendSpecialistAgent scaffolds Clean Architecture layers", () => {
  const agent = new FlutterBackendSpecialistAgent();
  const result = agent.scaffoldBackend({
    featureName: "Workout",
    stateManagement: "riverpod",
    backendProvider: "rest-dio",
    database: "shared_preferences",
    entities: [{ name: "Workout", fields: { id: "String", name: "String" } }]
  });

  assert.ok(result.repositoryInterfaceCode.includes("WorkoutRepository"));
  assert.ok(result.remoteDataSourceCode.includes("WorkoutRemoteDataSource"));
  assert.ok(result.stateNotifierCode.includes("workoutRepositoryProvider"));
});

test("FlutterErrorDiagnosticianAgent correctly diagnoses RenderFlex overflow", () => {
  const agent = new FlutterErrorDiagnosticianAgent();
  const result = agent.diagnose({
    errorMessage: "A RenderFlex overflowed by 48 pixels on the bottom in Column(children: ...)"
  });

  assert.strictEqual(result.errorType, "RENDERFLEX_OVERFLOW");
  assert.ok(result.suggestedFix.includes("SingleChildScrollView"));
});

test("FlutterTestingSpecialistAgent creates testWidgets test suite", () => {
  const agent = new FlutterTestingSpecialistAgent();
  const result = agent.generateTest({
    className: "WorkoutScreen",
    testType: "widget",
    stateManagement: "riverpod",
    methodsOrWidgetsToTest: ["render", "refresh"]
  });

  assert.ok(result.testCode.includes("testWidgets"));
  assert.ok(result.testCode.includes("ProviderScope"));
  assert.ok(result.testCode.includes("pumpAndSettle"));
});

test("FlutterMasterOrchestratorAgent pauses for platform clarification when missing", async () => {
  const orchestrator = new FlutterMasterOrchestratorAgent();
  const result = await orchestrator.orchestrateProject({
    prompt: "A food delivery application with restaurant listings and shopping cart"
  });

  assert.strictEqual(result.needsPlatformClarification, true);
  assert.ok(result.platformClarificationPrompt !== undefined);
});

test("FlutterMasterOrchestratorAgent executes complete pipeline when platforms provided", async () => {
  const orchestrator = new FlutterMasterOrchestratorAgent();
  const result = await orchestrator.orchestrateProject({
    prompt: "A food delivery app for Android and iOS with restaurant listings",
    targetPlatforms: ["android", "ios"]
  });

  assert.strictEqual(result.needsPlatformClarification, false);
  assert.ok(result.architecture !== undefined);
  assert.ok(result.pubspec !== undefined);
  assert.ok(result.uiModules && result.uiModules.length > 0);
  assert.ok(result.testSuites && result.testSuites.length > 0);
});

test("handleAuditFlutterCode detects unclosed controllers and print statements", async () => {
  const badCode = `
    class _MyState extends State<MyWidget> {
      late TextEditingController _controller = TextEditingController();
      void doSomething() {
        print("Hello");
      }
    }
  `;
  const response = await handleAuditFlutterCode({ code: badCode, fileType: "widget" });
  const parsed = JSON.parse(response.content[0].text);
  assert.ok(parsed.totalIssuesFound >= 2);
});

test("FlutterBridgeSpecialistAgent generates Dio client & WebSocket stream", () => {
  const agent = new FlutterBridgeSpecialistAgent();
  const result = agent.generateBridge({
    serviceName: "Cart",
    endpoints: [{ name: "getCart", method: "GET", path: "/items", responseType: "CartDto" }],
    models: [{ name: "CartDto", fields: { id: "String", total: "double" } }]
  });

  assert.ok(result.dioClientCode.includes("CartApiClient"));
  assert.ok(result.dartModelsCode.includes("class CartDto"));
  assert.ok(result.webSocketStreamCode.includes("cartRealtimeStreamProvider"));
});

test("FlutterPlatformSpecialistAgent generates Info.plist and AndroidManifest with permissions", () => {
  const agent = new FlutterPlatformSpecialistAgent();
  const result = agent.generateConfig({
    projectName: "ScannerApp",
    targetPlatforms: ["ios", "android", "web"],
    permissions: ["camera", "photos", "notifications"]
  });

  assert.ok(result.infoPlistXml.includes("NSCameraUsageDescription"));
  assert.ok(result.androidManifestXml.includes("android.permission.CAMERA"));
  assert.ok(result.webIndexHtml.includes("flutter_bootstrap.js"));
});

test("FlutterCicdSpecialistAgent generates Split APKs, gh secret set script, and Windows MSIX with test cert", () => {
  const agent = new FlutterCicdSpecialistAgent();
  const result = agent.generateCicd({
    projectName: "FinanceApp",
    targetPlatforms: ["android", "windows", "ios", "web"],
    enableSplitPerAbiApk: true,
    enableWindowsMsix: true,
    enableFastlane: true,
    enableWebDeploy: true
  });

  assert.ok(result.githubActionsYaml.includes("flutter build apk --split-per-abi --release"));
  assert.ok(result.githubActionsYaml.includes("runs-on: windows-latest"));
  assert.ok(result.githubActionsYaml.includes("New-SelfSignedCertificate"));
  assert.ok(result.keystoreSetupScriptPs1.includes("gh secret set ANDROID_KEYSTORE_BASE64"));
});

test("FlutterGoldenTestSpecialistAgent generates multi-device snapshot test", () => {
  const agent = new FlutterGoldenTestSpecialistAgent();
  const result = agent.generateGoldenTests({
    screenName: "ProfileScreen",
    widgetName: "ProfileView",
    testThemes: ["light", "dark"]
  });

  assert.ok(result.testCode.includes("Profile Golden Snapshot Tests"));
  assert.ok(result.testCode.includes("matchesGoldenFile"));
});

test("FlutterAiSpecialistAgent scaffolds Google Generative AI streaming module", () => {
  const agent = new FlutterAiSpecialistAgent();
  const result = agent.scaffoldAiModule({
    featureName: "Copilot",
    provider: "google-generative-ai",
    systemInstruction: "You are a code assistance AI."
  });

  assert.ok(result.serviceCode.includes("GenerativeModel"));
  assert.ok(result.providerCode.includes("copilotAiControllerProvider"));
  assert.ok(result.widgetCode.includes("CopilotAiView"));
});

test("FlutterSecuritySpecialistAgent flags hardcoded secrets and generates secure storage", () => {
  const agent = new FlutterSecuritySpecialistAgent();
  const result = agent.auditAndHarden({
    codeSnippet: `const apiKey = "AIzaSyD-123456789"; final prefs = await SharedPreferences.getInstance(); prefs.setString("token", "xyz");`,
    enableBiometrics: true,
    enableCertificatePinning: true
  });

  assert.ok(result.vulnerabilities.length >= 2);
  assert.ok(result.secureStorageServiceCode.includes("FlutterSecureStorage"));
  assert.ok(result.biometricAuthServiceCode?.includes("LocalAuthentication"));
  assert.ok(result.certificatePinningCode?.includes("badCertificateCallback"));
});

test("FlutterDatabaseSpecialistAgent scaffolds Drift SQLite database and reactive DAOs", () => {
  const agent = new FlutterDatabaseSpecialistAgent();
  const result = agent.scaffoldDatabase({
    databaseName: "Expense",
    tables: [
      { name: "Transaction", columns: { id: "integer", title: "text", amount: "real" }, primaryKey: "id" }
    ],
    schemaVersion: 1
  });

  assert.ok(result.driftDatabaseCode.includes("AppExpenseDatabase"));
  assert.ok(result.driftDatabaseCode.includes("TransactionTable"));
  assert.ok(result.daoCode.includes("ExpenseDao"));
});

test("FlutterLocalizationSpecialistAgent generates ARB bundles and RTL locale provider", () => {
  const agent = new FlutterLocalizationSpecialistAgent();
  const result = agent.generateLocalization({
    defaultLocale: "en",
    supportedLocales: ["en", "es", "ar"],
    stringKeys: {
      appTitle: { en: "Expense Tracker", es: "Control de Gastos", ar: "متتبع المصاريف" }
    }
  });

  assert.ok(result.l10nYaml.includes("app_localizations.dart"));
  assert.ok(result.arbEnJson.includes("Expense Tracker"));
  assert.ok(result.arbArJson?.includes("متتبع المصاريف"));
  assert.ok(result.localeProviderCode.includes("LocaleNotifier"));
});

test("FlutterObservabilitySpecialistAgent scaffolds Sentry and HTTP latency interceptors", () => {
  const agent = new FlutterObservabilitySpecialistAgent();
  const result = agent.scaffoldObservability({
    provider: "sentry",
    customEventNames: ["order_placed", "user_signup"]
  });

  assert.ok(result.initCode.includes("SentryFlutter.init"));
  assert.ok(result.analyticsServiceCode.includes("trackOrderPlaced"));
  assert.ok(result.performanceInterceptorCode?.includes("PerformanceDioInterceptor"));
});

test("FlutterDeepLinkSpecialistAgent configures go_router and App Links", () => {
  const agent = new FlutterDeepLinkSpecialistAgent();
  const result = agent.configureRouting({
    customScheme: "mywallet",
    domainHost: "wallet.example.com",
    routes: [
      { path: "/transfer/:id", screenName: "TransferScreen", parameters: ["id"] }
    ]
  });

  assert.ok(result.goRouterConfigCode.includes("GoRouter"));
  assert.ok(result.androidAssetLinksJson.includes("delegate_permission/common.handle_all_urls"));
  assert.ok(result.appleAppSiteAssociationJson.includes("applinks"));
  assert.ok(result.fcmNotificationHandlerCode.includes("FirebaseMessaging"));
});

test("FlutterAccessibilitySpecialistAgent flags WCAG violations and generates AccessibleTouchTarget", () => {
  const agent = new FlutterAccessibilitySpecialistAgent();
  const result = agent.auditAccessibility({
    codeSnippet: `IconButton(icon: Icon(Icons.add), onPressed: () {})`
  });

  assert.ok(result.violations.length >= 1);
  assert.ok(result.violations[0].wcagRule.includes("WCAG 2.1"));
  assert.ok(result.accessibleWidgetCode.includes("AccessibleTouchTarget"));
});

test("FlutterMockFactorySpecialistAgent generates deterministic mock data and repository", () => {
  const agent = new FlutterMockFactorySpecialistAgent();
  const result = agent.generateFactory({
    domainName: "Product",
    itemCount: 5,
    fields: { id: "uuid", title: "title", price: "price", status: "status" }
  });

  assert.ok(result.factoryCode.includes("ProductMockFactory"));
  assert.ok(result.mockRepositoryCode.includes("MockProductRepository"));
});

test("FlutterAuthFlowSpecialistAgent scaffolds onboarding, login, and AuthController", () => {
  const agent = new FlutterAuthFlowSpecialistAgent();
  const result = agent.scaffoldAuthFlow({
    appName: "HackathonApp",
    enableSocialLogins: true,
    enableOnboardingCarousel: true
  });

  assert.ok(result.onboardingScreenCode.includes("OnboardingScreen"));
  assert.ok(result.loginScreenCode.includes("LoginScreen"));
  assert.ok(result.authControllerCode.includes("AuthController"));
});

test("FlutterChartsSpecialistAgent generates fl_chart line chart widget", () => {
  const agent = new FlutterChartsSpecialistAgent();
  const result = agent.generateChart({
    chartTitle: "Growth Metrics",
    chartType: "line",
    dataPoints: [{ label: "Q1", value: 40 }, { label: "Q2", value: 80 }]
  });

  assert.ok(result.chartWidgetCode.includes("InteractiveLineChart"));
  assert.ok(result.chartWidgetCode.includes("fl_chart"));
});

test("FlutterOfflineResilienceSpecialistAgent scaffolds demo resilience interceptor", () => {
  const agent = new FlutterOfflineResilienceSpecialistAgent();
  const result = agent.scaffoldResilience({
    enableDemoMockFallback: true
  });

  assert.ok(result.resilienceInterceptorCode.includes("DemoResilienceInterceptor"));
  assert.ok(result.resilientRepositoryWrapperCode.includes("runWithDemoFallback"));
});

test("FlutterDocBlueprintSpecialistAgent generates PRD, architecture, rules, phases, design and memory docs", () => {
  const agent = new FlutterDocBlueprintSpecialistAgent();
  const result = agent.scaffoldDocuments({
    projectName: "PulseFit",
    appDescription: "An AI-powered fitness workout and nutrition tracker with real-time biometric metrics and dark mode OLED palette.",
    targetPlatforms: ["android", "ios"],
    projectType: "production",
    preferredArchitecture: "Clean Architecture with Riverpod",
    designPreferences: {
      colorTheme: "OLED Pitch Black & Neon Emerald",
      navigationStyle: "Bottom Navigation with Floating Action Center"
    }
  });

  assert.ok(result.documents.prdMd?.includes("Product Requirements Document (PRD): PulseFit"));
  assert.ok(result.documents.architectureMd?.includes("System Architecture: PulseFit"));
  assert.ok(result.documents.rulesMd?.includes("Engineering Guidelines & Code Quality Rules"));
  assert.ok(result.documents.phasesMd?.includes("Milestone 1: Foundation"));
  assert.ok(result.documents.designMd?.includes("OLED Pitch Black & Neon Emerald"));
  assert.ok(result.documents.memoryMd?.includes("Project Memory & Architectural Decision Records"));
  assert.strictEqual(result.generatedFiles.length, 6);
});
