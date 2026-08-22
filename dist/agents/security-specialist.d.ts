import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterSecurityAuditSpec {
    codeSnippet?: string;
    enableBiometrics?: boolean;
    enableCertificatePinning?: boolean;
    domainsToPin?: string[];
}
export interface FlutterSecurityResult {
    vulnerabilities: Array<{
        severity: "HIGH" | "MEDIUM" | "LOW";
        issue: string;
        recommendation: string;
    }>;
    secureStorageServiceCode: string;
    biometricAuthServiceCode?: string;
    certificatePinningCode?: string;
    summary: string;
}
export declare class FlutterSecuritySpecialistAgent extends BaseFlutterAgent {
    constructor();
    auditAndHarden(spec: FlutterSecurityAuditSpec): FlutterSecurityResult;
}
//# sourceMappingURL=security-specialist.d.ts.map