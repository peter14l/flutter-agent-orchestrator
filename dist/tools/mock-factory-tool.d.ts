export declare const generateFlutterMockFactorySchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            domainName: {
                type: string;
                description: string;
            };
            itemCount: {
                type: string;
                default: number;
            };
            fields: {
                type: string;
                additionalProperties: {
                    type: string;
                    enum: string[];
                };
            };
        };
        required: string[];
    };
};
export declare function handleGenerateFlutterMockFactory(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=mock-factory-tool.d.ts.map