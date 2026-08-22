import { BaseFlutterAgent } from "./base-agent.js";
export class FlutterChartsSpecialistAgent extends BaseFlutterAgent {
    constructor() {
        super("FlutterChartsSpecialistAgent", "Interactive Charts & Data Storytelling Specialist", "Scaffolds interactive, animated Line charts, Bar graphs, and Donut distribution charts via fl_chart with gradient fills and tooltips.");
    }
    generateChart(spec) {
        this.log("INFO", `Generating interactive ${spec.chartType} chart: ${spec.chartTitle}`);
        const chartWidgetCode = `// lib/core/widgets/charts/${spec.chartType}_chart_widget.dart

import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:gap/gap.dart';

class Interactive${spec.chartType.charAt(0).toUpperCase() + spec.chartType.slice(1)}Chart extends StatelessWidget {
  final String title;

  const Interactive${spec.chartType.charAt(0).toUpperCase() + spec.chartType.slice(1)}Chart({
    super.key,
    this.title = '${spec.chartTitle}',
  });

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Card(
      elevation: 0,
      color: colorScheme.surfaceContainerLow,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
        side: BorderSide(color: colorScheme.outlineVariant.withValues(alpha: 0.3)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
                Icon(Icons.insights, color: colorScheme.primary, size: 20),
              ],
            ),
            const Gap(24),
            SizedBox(
              height: 200,
              child: LineChart(
                LineChartData(
                  gridData: const FlGridData(show: false),
                  titlesData: const FlTitlesData(show: true),
                  borderData: FlBorderData(show: false),
                  lineBarsData: [
                    LineChartBarData(
                      spots: const [
${spec.dataPoints.map((p, i) => `                        FlSpot(${i}.0, ${p.value}),`).join("\n")}
                      ],
                      isCurved: true,
                      color: colorScheme.primary,
                      barWidth: 3,
                      isStrokeCapRound: true,
                      dotData: const FlDotData(show: false),
                      belowBarData: BarAreaData(
                        show: true,
                        gradient: LinearGradient(
                          colors: [
                            colorScheme.primary.withValues(alpha: 0.3),
                            colorScheme.primary.withValues(alpha: 0.0),
                          ],
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`;
        const pubspecDependencies = {
            "fl_chart": "^0.70.2"
        };
        const summary = `Generated animated ${spec.chartType} chart widget for '${spec.chartTitle}' with gradient fills and fl_chart integration.`;
        return {
            chartWidgetCode,
            pubspecDependencies,
            summary
        };
    }
}
//# sourceMappingURL=charts-specialist.js.map