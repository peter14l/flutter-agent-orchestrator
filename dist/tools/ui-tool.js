import { FlutterUISpecialistAgent } from "../agents/ui-specialist.js";
const agent = new FlutterUISpecialistAgent();
export const designFlutterUiSchema = {
    name: "design_flutter_ui",
    description: "Designs production-ready Flutter widgets, Material 3 responsive layouts (Mobile/Web/Desktop), Riverpod/Bloc state integration, and fluid animations.",
    inputSchema: {
        type: "object",
        properties: {
            screenName: {
                type: "string",
                description: "Name of the screen (e.g. 'DashboardScreen', 'UserProfileScreen')."
            },
            targetPlatforms: {
                type: "array",
                items: {
                    type: "string",
                    enum: ["android", "ios", "web", "macos", "windows", "linux"]
                },
                description: "Target platforms for adaptive layout rendering.",
                default: ["android", "ios"]
            },
            stateManagement: {
                type: "string",
                enum: ["riverpod", "bloc", "provider", "signals"],
                description: "State management system.",
                default: "riverpod"
            },
            layoutDescription: {
                type: "string",
                description: "Detailed description of screen layout, widgets, and user interactions."
            }
        },
        required: ["screenName", "layoutDescription"]
    }
};
export async function handleDesignFlutterUi(args) {
    const spec = {
        screenName: args.screenName,
        targetPlatforms: args.targetPlatforms || ["android", "ios"],
        stateManagement: args.stateManagement || "riverpod",
        layoutDescription: args.layoutDescription,
        includeMaterial3: true,
        includeAdaptive: true
    };
    const result = agent.designScreen(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=ui-tool.js.map