export declare const scaffoldFlutterProjectDocsSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            projectName: {
                type: string;
                description: string;
            };
            appDescription: {
                type: string;
                description: string;
            };
            targetPlatforms: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            projectType: {
                type: string;
                enum: string[];
                description: string;
            };
            preferredArchitecture: {
                type: string;
                description: string;
            };
            designPreferences: {
                type: string;
                properties: {
                    colorTheme: {
                        type: string;
                    };
                    typography: {
                        type: string;
                    };
                    navigationStyle: {
                        type: string;
                    };
                    darkMode: {
                        type: string;
                    };
                };
                description: string;
            };
            outputDirectory: {
                type: string;
                description: string;
            };
            overwriteExisting: {
                type: string;
                description: string;
                default: boolean;
            };
        };
        required: string[];
    };
};
export declare function handleScaffoldFlutterProjectDocs(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=doc-blueprint-tool.d.ts.map