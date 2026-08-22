export declare const generateFlutterChartsSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            chartTitle: {
                type: string;
                description: string;
            };
            chartType: {
                type: string;
                enum: string[];
                default: string;
            };
            dataPoints: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        label: {
                            type: string;
                        };
                        value: {
                            type: string;
                        };
                    };
                    required: string[];
                };
            };
        };
        required: string[];
    };
};
export declare function handleGenerateFlutterCharts(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=charts-tool.d.ts.map