export declare const configureFlutterDeepLinksSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            customScheme: {
                type: string;
                description: string;
                default: string;
            };
            domainHost: {
                type: string;
                description: string;
                default: string;
            };
            routes: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        path: {
                            type: string;
                        };
                        screenName: {
                            type: string;
                        };
                        parameters: {
                            type: string;
                            items: {
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
export declare function handleConfigureFlutterDeepLinks(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=deeplink-tool.d.ts.map