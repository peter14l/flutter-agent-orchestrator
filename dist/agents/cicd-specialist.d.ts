import { BaseFlutterAgent } from "./base-agent.js";
import { FlutterPlatform } from "../types.js";
export interface FlutterCicdSpec {
    projectName: string;
    targetPlatforms: FlutterPlatform[];
    enableSplitPerAbiApk?: boolean;
    enableWindowsMsix?: boolean;
    enableFastlane?: boolean;
    enableWebDeploy?: boolean;
    androidPackageName?: string;
}
export interface FlutterCicdResult {
    githubActionsYaml: string;
    keystoreSetupScriptPs1: string;
    keystoreSetupScriptSh: string;
    androidSigningGradleKts: string;
    msixPubspecConfig: string;
    fastfile?: string;
    summary: string;
}
export declare class FlutterCicdSpecialistAgent extends BaseFlutterAgent {
    constructor();
    generateCicd(spec: FlutterCicdSpec): FlutterCicdResult;
}
//# sourceMappingURL=cicd-specialist.d.ts.map