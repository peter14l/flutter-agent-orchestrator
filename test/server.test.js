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

test("FlutterUISpecialistAgent creates responsive Material 3 ConsumerWidget", () => {
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
  assert.ok(result.modelCode.includes("WorkoutDashboardItem"));
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
