import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterDeepLinkSpec {
    customScheme: string;
    domainHost: string;
    routes: Array<{
        path: string;
        screenName: string;
        parameters?: string[];
    }>;
}
export interface FlutterDeepLinkResult {
    goRouterConfigCode: string;
    androidAssetLinksJson: string;
    appleAppSiteAssociationJson: string;
    fcmNotificationHandlerCode: string;
    summary: string;
}
export declare class FlutterDeepLinkSpecialistAgent extends BaseFlutterAgent {
    constructor();
    configureRouting(spec: FlutterDeepLinkSpec): FlutterDeepLinkResult;
}
//# sourceMappingURL=deeplink-specialist.d.ts.map