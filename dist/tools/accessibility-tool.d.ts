export declare const auditFlutterAccessibilitySchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            codeSnippet: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare function handleAuditFlutterAccessibility(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=accessibility-tool.d.ts.map