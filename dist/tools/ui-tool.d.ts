export declare const designFlutterUiSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            screenName: {
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
                default: string[];
            };
            stateManagement: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            layoutDescription: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare function handleDesignFlutterUi(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=ui-tool.d.ts.map