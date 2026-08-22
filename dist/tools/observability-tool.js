import { FlutterObservabilitySpecialistAgent } from "../agents/observability-specialist.js";
const agent = new FlutterObservabilitySpecialistAgent();
export const scaffoldFlutterObservabilitySchema = {
    name: "scaffold_flutter_observability",
    description: "Scaffolds Sentry/Firebase Crashlytics crash reporting, type-safe custom analytics event loggers, and HTTP request latency interceptors.",
    inputSchema: {
        type: "object",
        properties: {
            provider: {
                type: "string",
                enum: ["sentry", "firebase", "datadog"],
                default: "sentry"
            },
            enablePerformanceMonitoring: {
                type: "boolean",
                default: true
            },
            customEventNames: {
                type: "array",
                items: { type: "string" },
                description: "List of analytics event names (e.g. ['checkout_started', 'payment_success'])."
            }
        }
    }
};
export async function handleScaffoldFlutterObservability(args) {
    const spec = {
        provider: args.provider || "sentry",
        enablePerformanceMonitoring: args.enablePerformanceMonitoring !== false,
        customEventNames: args.customEventNames
    };
    const result = agent.scaffoldObservability(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=observability-tool.js.map