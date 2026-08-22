export declare const generateFlutterApiBridgeSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            serviceName: {
                type: string;
                description: string;
            };
            baseUrl: {
                type: string;
                description: string;
                default: string;
            };
            endpoints: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        name: {
                            type: string;
                        };
                        method: {
                            type: string;
                            enum: string[];
                        };
                        path: {
                            type: string;
                        };
                        requestType: {
                            type: string;
                        };
                        responseType: {
                            type: string;
                        };
                    };
                    required: string[];
                };
            };
            models: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        name: {
                            type: string;
                        };
                        fields: {
                            type: string;
                            additionalProperties: {
                                type: string;
                            };
                        };
                    };
                    required: string[];
                };
            };
        };
        required: string[];
    };
};
export declare function handleGenerateFlutterApiBridge(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=bridge-tool.d.ts.map