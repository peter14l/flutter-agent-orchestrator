export declare const scaffoldFlutterBackendSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            featureName: {
                type: string;
                description: string;
            };
            stateManagement: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            backendProvider: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            database: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
        };
        required: string[];
    };
};
export declare function handleScaffoldFlutterBackend(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=backend-tool.d.ts.map