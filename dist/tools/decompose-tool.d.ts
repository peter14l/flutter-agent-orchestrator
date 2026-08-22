export declare const decomposeFlutterPromptSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            prompt: {
                type: string;
                description: string;
            };
            targetPlatforms: {
                type: string;
                items: {
                    type: string;
                    enum: string[];
                };
                description: string;
            };
            projectName: {
                type: string;
                description: string;
                default: string;
            };
            stateManagement: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            architecturePattern: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
        };
        required: string[];
    };
};
export declare function handleDecomposeFlutterPrompt(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=decompose-tool.d.ts.map