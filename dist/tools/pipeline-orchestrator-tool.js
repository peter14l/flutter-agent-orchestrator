import { FlutterMasterOrchestratorAgent } from "../agents/master-orchestrator.js";
const agent = new FlutterMasterOrchestratorAgent();
export const orchestrateFlutterProjectSchema = {
    name: "orchestrate_flutter_project",
    description: "End-to-end multi-agent orchestration for Flutter apps. Checks target platforms first (asks if not specified), then executes prompt decomposition, pubspec creation, UI screens, backend/state layer, and tests.",
    inputSchema: {
        type: "object",
        properties: {
            prompt: {
                type: "string",
                description: "The complete project prompt or feature specification."
            },
            projectName: {
                type: "string",
                description: "Flutter project name (e.g. 'e_commerce_app').",
                default: "flutter_app"
            },
            targetPlatforms: {
                type: "array",
                items: {
                    type: "string",
                    enum: ["android", "ios", "web", "macos", "windows", "linux"]
                },
                description: "Target platforms. If omitted and not mentioned in the prompt, execution will pause and request platform clarification."
            },
            stateManagement: {
                type: "string",
                enum: ["riverpod", "bloc", "provider", "signals"],
                description: "State management system.",
                default: "riverpod"
            },
            includeUi: {
                type: "boolean",
                description: "Whether to generate responsive Flutter UI screens.",
                default: true
            },
            includeBackend: {
                type: "boolean",
                description: "Whether to scaffold Clean Architecture data sources and repositories.",
                default: true
            },
            includeTests: {
                type: "boolean",
                description: "Whether to generate Unit & Widget test suites.",
                default: true
            }
        },
        required: ["prompt"]
    }
};
export async function handleOrchestrateFlutterProject(args) {
    const spec = {
        prompt: args.prompt,
        projectName: args.projectName || "flutter_app",
        targetPlatforms: args.targetPlatforms,
        stateManagement: args.stateManagement || "riverpod",
        includeUi: args.includeUi !== false,
        includeBackend: args.includeBackend !== false,
        includeTests: args.includeTests !== false
    };
    const result = await agent.orchestrateProject(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=pipeline-orchestrator-tool.js.map