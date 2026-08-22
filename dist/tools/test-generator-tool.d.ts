export declare const generateFlutterTestsSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            className: {
                type: string;
                description: string;
            };
            testType: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            stateManagement: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            methodsOrWidgetsToTest: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
        };
        required: string[];
    };
};
export declare function handleGenerateFlutterTests(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=test-generator-tool.d.ts.map