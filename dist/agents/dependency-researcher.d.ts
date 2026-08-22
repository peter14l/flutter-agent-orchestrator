import { BaseFlutterAgent } from "./base-agent.js";
import { FlutterPlatform, FlutterStateManagement, PubPackageInfo, PubspecResult } from "../types.js";
export declare class FlutterDependencyResearcherAgent extends BaseFlutterAgent {
    constructor();
    researchAndGeneratePubspec(projectName?: string, targetPlatforms?: FlutterPlatform[], stateManagement?: FlutterStateManagement, customPackages?: string[]): Promise<{
        pubspec: PubspecResult;
        researchedPackages: PubPackageInfo[];
        advice: string;
    }>;
    getRegistryPackages(): PubPackageInfo[];
}
//# sourceMappingURL=dependency-researcher.d.ts.map