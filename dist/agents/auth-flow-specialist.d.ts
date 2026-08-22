import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterAuthFlowSpec {
    appName: string;
    enableSocialLogins?: boolean;
    enableOnboardingCarousel?: boolean;
}
export interface FlutterAuthFlowResult {
    onboardingScreenCode: string;
    loginScreenCode: string;
    authControllerCode: string;
    summary: string;
}
export declare class FlutterAuthFlowSpecialistAgent extends BaseFlutterAgent {
    constructor();
    scaffoldAuthFlow(spec: FlutterAuthFlowSpec): FlutterAuthFlowResult;
}
//# sourceMappingURL=auth-flow-specialist.d.ts.map