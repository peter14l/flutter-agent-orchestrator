import { FlutterSecuritySpecialistAgent } from "../agents/security-specialist.js";
const agent = new FlutterSecuritySpecialistAgent();
export const auditFlutterSecuritySchema = {
    name: "audit_flutter_security",
    description: "Audits Flutter source code for hardcoded secrets, unencrypted SharedPreferences, and insecure HTTP endpoints. Scaffolds hardware-backed Keychain/Keystore SecureStorage, Biometric Auth, and SSL Pinning.",
    inputSchema: {
        type: "object",
        properties: {
            codeSnippet: {
                type: "string",
                description: "Flutter code snippet to audit for security vulnerabilities."
            },
            enableBiometrics: {
                type: "boolean",
                description: "Generate LocalAuthentication biometric verification service.",
                default: true
            },
            enableCertificatePinning: {
                type: "boolean",
                description: "Generate SSL/TLS Certificate Pinning interceptor.",
                default: false
            }
        }
    }
};
export async function handleAuditFlutterSecurity(args) {
    const spec = {
        codeSnippet: args.codeSnippet,
        enableBiometrics: args.enableBiometrics !== false,
        enableCertificatePinning: args.enableCertificatePinning === true
    };
    const result = agent.auditAndHarden(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=security-tool.js.map