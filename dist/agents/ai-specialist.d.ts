import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterAiModuleSpec {
    featureName: string;
    provider: "google-generative-ai" | "flutter-ai-local" | "tflite";
    systemInstruction?: string;
}
export interface FlutterAiModuleResult {
    serviceCode: string;
    providerCode: string;
    widgetCode: string;
    pubspecDependencies: Record<string, string>;
    summary: string;
}
export declare class FlutterAiSpecialistAgent extends BaseFlutterAgent {
    constructor();
    scaffoldAiModule(spec: FlutterAiModuleSpec): FlutterAiModuleResult;
}
//# sourceMappingURL=ai-specialist.d.ts.map