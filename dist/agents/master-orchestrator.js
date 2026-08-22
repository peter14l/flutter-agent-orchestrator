import { BaseFlutterAgent } from "./base-agent.js";
import { FlutterPromptDecomposerAgent } from "./prompt-decomposer.js";
import { FlutterDependencyResearcherAgent } from "./dependency-researcher.js";
import { FlutterUISpecialistAgent } from "./ui-specialist.js";
import { FlutterBackendSpecialistAgent } from "./backend-specialist.js";
import { FlutterTestingSpecialistAgent } from "./testing-specialist.js";
export class FlutterMasterOrchestratorAgent extends BaseFlutterAgent {
    decomposer;
    researcher;
    uiSpecialist;
    backendSpecialist;
    tester;
    constructor() {
        super("FlutterMasterOrchestratorAgent", "Lead Flutter Multi-Agent Pipeline Coordinator", "Coordinates all specialized Flutter agents, checks target platform requirements, and generates complete Flutter project scaffolds.");
        this.decomposer = new FlutterPromptDecomposerAgent();
        this.researcher = new FlutterDependencyResearcherAgent();
        this.uiSpecialist = new FlutterUISpecialistAgent();
        this.backendSpecialist = new FlutterBackendSpecialistAgent();
        this.tester = new FlutterTestingSpecialistAgent();
    }
    async orchestrateProject(spec) {
        const projectName = spec.projectName || "flutter_app";
        this.log("INFO", `🚀 Launching Flutter Multi-Agent Pipeline for "${projectName}"`);
        // Step 1: Check Platform Specification & Decompose
        this.log("INFO", `[Step 1/5] Invoking FlutterPromptArchitectAgent...`);
        const architecture = this.decomposer.decompose(spec.prompt, spec.targetPlatforms, projectName, spec.stateManagement || "riverpod");
        // If platforms are missing, pause and request platform clarification
        if (architecture.needsPlatformClarification) {
            this.log("WARN", `Platform specification missing. Requesting clarification before execution.`);
            return {
                projectName,
                targetPlatforms: [],
                needsPlatformClarification: true,
                platformClarificationPrompt: architecture.platformClarificationPrompt,
                setupInstructions: "Please provide target platform(s) to continue execution.",
                nextSteps: ["Specify target platforms: iOS, Android, Web, macOS, Windows, or Linux"]
            };
        }
        const targetPlatforms = architecture.targetPlatforms;
        // Step 2: Research & Generate pubspec.yaml
        this.log("INFO", `[Step 2/5] Invoking FlutterDependencyResearcherAgent...`);
        const dependencyResult = await this.researcher.researchAndGeneratePubspec(projectName, targetPlatforms, spec.stateManagement || "riverpod");
        const pubspec = dependencyResult.pubspec;
        // Step 3: Scaffold UI Widgets
        const uiModules = [];
        if (spec.includeUi !== false) {
            this.log("INFO", `[Step 3/5] Invoking FlutterUISpecialistAgent for Main Screen...`);
            const mainUi = this.uiSpecialist.designScreen({
                screenName: "Main",
                targetPlatforms,
                stateManagement: spec.stateManagement || "riverpod",
                layoutDescription: spec.prompt,
                includeMaterial3: true,
                includeAdaptive: true
            });
            uiModules.push(mainUi);
        }
        // Step 4: Scaffold Backend / State Layer
        let backendModules = undefined;
        if (spec.includeBackend !== false) {
            this.log("INFO", `[Step 4/5] Invoking FlutterBackendSpecialistAgent...`);
            backendModules = this.backendSpecialist.scaffoldBackend({
                featureName: "Main",
                stateManagement: spec.stateManagement || "riverpod",
                backendProvider: "rest-dio",
                database: "shared_preferences",
                entities: [
                    {
                        name: "MainItem",
                        fields: { id: "String", name: "String", description: "String", updatedAt: "DateTime" }
                    }
                ]
            });
        }
        // Step 5: Generate QA Tests
        const testSuites = [];
        if (spec.includeTests !== false) {
            this.log("INFO", `[Step 5/5] Invoking FlutterTestingSpecialistAgent...`);
            const widgetTest = this.tester.generateTest({
                className: "MainScreen",
                testType: "widget",
                stateManagement: spec.stateManagement || "riverpod",
                methodsOrWidgetsToTest: ["build", "refresh"]
            });
            const unitTest = this.tester.generateTest({
                className: "MainController",
                testType: "unit",
                stateManagement: spec.stateManagement || "riverpod",
                methodsOrWidgetsToTest: ["loadItems", "updateSearchQuery"]
            });
            testSuites.push(widgetTest, unitTest);
        }
        const setupInstructions = `
# 🛠️ Setup & Execution Instructions for ${projectName}

### 1. Save pubspec.yaml
Save the generated \`pubspec.yaml\` into your Flutter project root.

### 2. Fetch Dependencies & Run Code Generators
\`\`\`bash
flutter pub get
dart run build_runner build --delete-conflicting-outputs
\`\`\`

### 3. Run Static Analysis & Tests
\`\`\`bash
flutter analyze
flutter test
\`\`\`

### 4. Launch on Target Platforms (${targetPlatforms.join(", ")})
\`\`\`bash
flutter run
\`\`\`
    `.trim();
        const nextSteps = [
            "Review the architectural feature roadmap (P0/P1/P2 priorities)",
            "Run 'flutter pub get' to resolve dependencies",
            "Run 'dart run build_runner build' if using code generation",
            "Execute 'flutter test' to verify baseline unit and widget tests"
        ];
        this.log("INFO", `✅ Flutter Multi-Agent pipeline completed successfully!`);
        return {
            projectName,
            targetPlatforms,
            needsPlatformClarification: false,
            architecture,
            pubspec,
            uiModules: uiModules.length > 0 ? uiModules : undefined,
            backendModules,
            testSuites: testSuites.length > 0 ? testSuites : undefined,
            setupInstructions,
            nextSteps
        };
    }
}
//# sourceMappingURL=master-orchestrator.js.map