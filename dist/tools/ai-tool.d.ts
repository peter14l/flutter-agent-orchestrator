export declare const scaffoldFlutterAiModuleSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            featureName: {
                type: string;
                description: string;
            };
            provider: {
                type: string;
                enum: string[];
                default: string;
            };
            systemInstruction: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare function handleScaffoldFlutterAiModule(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=ai-tool.d.ts.map