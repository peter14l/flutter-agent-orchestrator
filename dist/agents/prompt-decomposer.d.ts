import { BaseFlutterAgent } from "./base-agent.js";
import { FlutterArchitecturePlan, FlutterPlatform, FlutterStateManagement, FlutterArchitecture, PlatformCheckResult } from "../types.js";
export declare class FlutterPromptDecomposerAgent extends BaseFlutterAgent {
    constructor();
    detectPlatforms(prompt: string, explicitPlatforms?: FlutterPlatform[]): PlatformCheckResult;
    decompose(prompt: string, targetPlatforms?: FlutterPlatform[], projectName?: string, stateManagement?: FlutterStateManagement, architecturePattern?: FlutterArchitecture): FlutterArchitecturePlan;
}
//# sourceMappingURL=prompt-decomposer.d.ts.map