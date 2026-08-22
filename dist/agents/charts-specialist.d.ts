import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterChartsSpec {
    chartTitle: string;
    chartType: "line" | "bar" | "pie" | "sparkline";
    dataPoints: Array<{
        label: string;
        value: number;
    }>;
}
export interface FlutterChartsResult {
    chartWidgetCode: string;
    pubspecDependencies: Record<string, string>;
    summary: string;
}
export declare class FlutterChartsSpecialistAgent extends BaseFlutterAgent {
    constructor();
    generateChart(spec: FlutterChartsSpec): FlutterChartsResult;
}
//# sourceMappingURL=charts-specialist.d.ts.map