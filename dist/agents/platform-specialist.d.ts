import { BaseFlutterAgent } from "./base-agent.js";
import { FlutterPlatform } from "../types.js";
export interface FlutterPlatformConfigSpec {
    projectName: string;
    targetPlatforms: FlutterPlatform[];
    permissions: Array<"camera" | "location" | "photos" | "notifications" | "microphone" | "bluetooth">;
}
export interface FlutterPlatformConfigResult {
    infoPlistXml: string;
    androidManifestXml: string;
    webIndexHtml: string;
    summary: string;
}
export declare class FlutterPlatformSpecialistAgent extends BaseFlutterAgent {
    constructor();
    generateConfig(spec: FlutterPlatformConfigSpec): FlutterPlatformConfigResult;
}
//# sourceMappingURL=platform-specialist.d.ts.map