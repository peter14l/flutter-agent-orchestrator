import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterObservabilitySpec {
    provider: "sentry" | "firebase" | "datadog";
    enablePerformanceMonitoring?: boolean;
    customEventNames?: string[];
}
export interface FlutterObservabilityResult {
    initCode: string;
    analyticsServiceCode: string;
    performanceInterceptorCode?: string;
    pubspecDependencies: Record<string, string>;
    summary: string;
}
export declare class FlutterObservabilitySpecialistAgent extends BaseFlutterAgent {
    constructor();
    scaffoldObservability(spec: FlutterObservabilitySpec): FlutterObservabilityResult;
}
//# sourceMappingURL=observability-specialist.d.ts.map