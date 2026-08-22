import { FlutterChartsSpecialistAgent } from "../agents/charts-specialist.js";
const agent = new FlutterChartsSpecialistAgent();
export const generateFlutterChartsSchema = {
    name: "generate_flutter_charts",
    description: "Scaffolds animated interactive Line charts, Bar graphs, and Donut charts via fl_chart with gradient fills and tooltips for hackathon data storytelling.",
    inputSchema: {
        type: "object",
        properties: {
            chartTitle: {
                type: "string",
                description: "Title of the chart widget."
            },
            chartType: {
                type: "string",
                enum: ["line", "bar", "pie", "sparkline"],
                default: "line"
            },
            dataPoints: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        label: { type: "string" },
                        value: { type: "number" }
                    },
                    required: ["label", "value"]
                }
            }
        },
        required: ["chartTitle"]
    }
};
export async function handleGenerateFlutterCharts(args) {
    const spec = {
        chartTitle: args.chartTitle,
        chartType: args.chartType || "line",
        dataPoints: args.dataPoints || [
            { label: "Mon", value: 35 },
            { label: "Tue", value: 58 },
            { label: "Wed", value: 42 },
            { label: "Thu", value: 85 },
            { label: "Fri", value: 72 },
            { label: "Sat", value: 94 },
            { label: "Sun", value: 110 }
        ]
    };
    const result = agent.generateChart(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=charts-tool.js.map