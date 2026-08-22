export declare const orchestrateFlutterProjectSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            prompt: {
                type: string;
                description: string;
            };
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
            };
            stateManagement: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            includeUi: {
                type: string;
                description: string;
                default: boolean;
            };
            includeBackend: {
                type: string;
                description: string;
                default: boolean;
            };
            includeTests: {
                type: string;
                description: string;
                default: boolean;
            };
        };
        required: string[];
    };
};
export declare function handleOrchestrateFlutterProject(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=pipeline-orchestrator-tool.d.ts.map