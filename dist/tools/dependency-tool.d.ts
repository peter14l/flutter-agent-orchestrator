export declare const researchFlutterDependenciesSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            projectName: {
                type: string;
                description: string;
                default: string;
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
            packages: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
        };
        required: never[];
    };
};
export declare function handleResearchFlutterDependencies(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=dependency-tool.d.ts.map