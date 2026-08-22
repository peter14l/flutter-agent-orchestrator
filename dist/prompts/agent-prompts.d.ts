export interface FlutterMcpPromptDefinition {
    name: string;
    description: string;
    arguments?: Array<{
        name: string;
        description: string;
        required: boolean;
    }>;
    template: (args: Record<string, string>) => string;
}
export declare const FLUTTER_MCP_PROMPTS: FlutterMcpPromptDefinition[];
//# sourceMappingURL=agent-prompts.d.ts.map