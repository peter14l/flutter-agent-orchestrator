export declare const auditFlutterSecuritySchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            codeSnippet: {
                type: string;
                description: string;
            };
            enableBiometrics: {
                type: string;
                description: string;
                default: boolean;
            };
            enableCertificatePinning: {
                type: string;
                description: string;
                default: boolean;
            };
        };
    };
};
export declare function handleAuditFlutterSecurity(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=security-tool.d.ts.map