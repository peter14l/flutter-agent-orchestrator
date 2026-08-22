import { FlutterAiSpecialistAgent } from "../agents/ai-specialist.js";
const agent = new FlutterAiSpecialistAgent();
export const scaffoldFlutterAiModuleSchema = {
    name: "scaffold_flutter_ai_module",
    description: "Scaffolds Google Generative AI (Gemini) SDK integration for Flutter with streaming responses, Riverpod state controllers, and interactive chat views.",
    inputSchema: {
        type: "object",
        properties: {
            featureName: {
                type: "string",
                description: "Name of the AI feature (e.g. 'ChatAssistant', 'SmartScanner', 'Copilot')."
            },
            provider: {
                type: "string",
                enum: ["google-generative-ai", "flutter-ai-local", "tflite"],
                default: "google-generative-ai"
            },
            systemInstruction: {
                type: "string",
                description: "Custom system instruction/persona for the AI model."
            }
        },
        required: ["featureName"]
    }
};
export async function handleScaffoldFlutterAiModule(args) {
    const spec = {
        featureName: args.featureName,
        provider: args.provider || "google-generative-ai",
        systemInstruction: args.systemInstruction
    };
    const result = agent.scaffoldAiModule(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=ai-tool.js.map