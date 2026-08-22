import { FlutterPlatform, PubPackageInfo, PubspecResult } from "../types.js";
export declare const FLUTTER_ECOSYSTEM_REGISTRY: Record<string, PubPackageInfo>;
export declare class PubSearchHelper {
    static searchPubDev(query: string): Promise<PubPackageInfo[]>;
    static generatePubspec(projectName?: string, targetPlatforms?: FlutterPlatform[], stateManagement?: "riverpod" | "bloc" | "provider" | "signals", extraPackages?: string[]): PubspecResult;
}
//# sourceMappingURL=pub-search.d.ts.map