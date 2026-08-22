import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterOfflineResilienceSpec {
    enableDemoMockFallback?: boolean;
    cacheDurationMinutes?: number;
}
export interface FlutterOfflineResilienceResult {
    resilienceInterceptorCode: string;
    resilientRepositoryWrapperCode: string;
    summary: string;
}
export declare class FlutterOfflineResilienceSpecialistAgent extends BaseFlutterAgent {
    constructor();
    scaffoldResilience(spec: FlutterOfflineResilienceSpec): FlutterOfflineResilienceResult;
}
//# sourceMappingURL=offline-resilience-specialist.d.ts.map