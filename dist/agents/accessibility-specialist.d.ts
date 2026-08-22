import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterA11yAuditSpec {
    codeSnippet: string;
}
export interface FlutterA11yAuditResult {
    violations: Array<{
        severity: "HIGH" | "MEDIUM" | "LOW";
        element: string;
        wcagRule: string;
        fix: string;
    }>;
    accessibleWidgetCode: string;
    summary: string;
}
export declare class FlutterAccessibilitySpecialistAgent extends BaseFlutterAgent {
    constructor();
    auditAccessibility(spec: FlutterA11yAuditSpec): FlutterA11yAuditResult;
}
//# sourceMappingURL=accessibility-specialist.d.ts.map