import { BaseFlutterAgent } from "./base-agent.js";
import { UIWidgetSpec, UIWidgetResult } from "../types.js";
export type FlutterAppArchetype = "fintech" | "ecommerce" | "fitness" | "ai_chat" | "dashboard" | "social" | "general";
export declare class FlutterUISpecialistAgent extends BaseFlutterAgent {
    constructor();
    detectArchetype(description: string, screenName: string): FlutterAppArchetype;
    hasGlassmorphism(description: string): boolean;
    designScreen(spec: UIWidgetSpec): UIWidgetResult;
    private generateDomainModel;
    private generateStateController;
    private generateMockData;
    private generateWidgetScreen;
}
//# sourceMappingURL=ui-specialist.d.ts.map