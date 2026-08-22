export declare const scaffoldFlutterOfflineResilienceSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            enableDemoMockFallback: {
                type: string;
                default: boolean;
            };
            cacheDurationMinutes: {
                type: string;
                default: number;
            };
        };
    };
};
export declare function handleScaffoldFlutterOfflineResilience(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=offline-resilience-tool.d.ts.map