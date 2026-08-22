export declare const scaffoldFlutterObservabilitySchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            provider: {
                type: string;
                enum: string[];
                default: string;
            };
            enablePerformanceMonitoring: {
                type: string;
                default: boolean;
            };
            customEventNames: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
        };
    };
};
export declare function handleScaffoldFlutterObservability(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=observability-tool.d.ts.map