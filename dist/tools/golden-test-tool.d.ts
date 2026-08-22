export declare const generateFlutterGoldenTestsSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            screenName: {
                type: string;
                description: string;
            };
            widgetName: {
                type: string;
                description: string;
                default: string;
            };
            testThemes: {
                type: string;
                items: {
                    type: string;
                    enum: string[];
                };
                default: string[];
            };
        };
        required: string[];
    };
};
export declare function handleGenerateFlutterGoldenTests(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=golden-test-tool.d.ts.map