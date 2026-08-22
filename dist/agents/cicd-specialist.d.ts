import { BaseFlutterAgent } from "./base-agent.js";
import { FlutterPlatform } from "../types.js";
export interface FlutterCicdSpec {
    projectName: string;
    targetPlatforms: FlutterPlatform[];
    enableFastlane: boolean;
    enableWebDeploy: boolean;
}
export interface FlutterCicdResult {
    githubActionsYaml: string;
    fastfile?: string;
    summary: string;
}
export declare class FlutterCicdSpecialistAgent extends BaseFlutterAgent {
    constructor();
    generateCicd(spec: FlutterCicdSpec): FlutterCicdResult;
}
//# sourceMappingURL=cicd-specialist.d.ts.map