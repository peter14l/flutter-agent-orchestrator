export declare const generateFlutterCicdSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            projectName: {
                type: string;
                description: string;
            };
            targetPlatforms: {
                type: string;
                items: {
                    type: string;
                    enum: string[];
                };
                default: string[];
            };
            enableFastlane: {
                type: string;
                description: string;
                default: boolean;
            };
            enableWebDeploy: {
                type: string;
                description: string;
                default: boolean;
            };
        };
        required: string[];
    };
};
export declare function handleGenerateFlutterCicd(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=cicd-tool.d.ts.map