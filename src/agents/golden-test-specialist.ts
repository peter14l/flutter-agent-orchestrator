import { BaseFlutterAgent } from "./base-agent.js";

export interface FlutterGoldenTestSpec {
  widgetName: string;
  screenName: string;
  testThemes: Array<"light" | "dark">;
}

export interface FlutterGoldenTestResult {
  testClassName: string;
  testCode: string;
  runCommand: string;
  summary: string;
}

export class FlutterGoldenTestSpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterGoldenTestSpecialistAgent",
      "Visual Golden Snapshot Testing Specialist",
      "Generates multi-device golden snapshot test suites for Flutter widgets across Light/Dark modes, mobile, and tablet viewports."
    );
  }

  public generateGoldenTests(spec: FlutterGoldenTestSpec): FlutterGoldenTestResult {
    this.log("INFO", `Generating golden tests for widget: ${spec.widgetName}`);

    const baseName = spec.screenName.replace(/(Screen|Widget|Test)$/i, "");
    const testClassName = `${baseName}GoldenTest`;
    const snakeName = baseName.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();

    const testCode = `// test/golden/${snakeName}_golden_test.dart

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:app/features/${snakeName}/presentation/screens/${snakeName}_screen.dart';

void main() {
  group('${baseName} Golden Snapshot Tests', () {
    testWidgets('matches golden snapshot in light mode on phone', (WidgetTester tester) async {
      // Configure phone viewport
      tester.view.physicalSize = const Size(1170, 2532);
      tester.view.devicePixelRatio = 3.0;

      addTearDown(() {
        tester.view.resetPhysicalSize();
        tester.view.resetDevicePixelRatio();
      });

      await tester.pumpWidget(
        MaterialApp(
          theme: ThemeData.light(useMaterial3: true),
          home: const ProviderScope(
            child: ${spec.screenName}(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      await expectLater(
        find.byType(${spec.screenName}),
        matchesGoldenFile('goldens/${snakeName}_light_phone.png'),
      );
    });

    testWidgets('matches golden snapshot in dark mode on tablet', (WidgetTester tester) async {
      // Configure tablet viewport
      tester.view.physicalSize = const Size(2048, 2732);
      tester.view.devicePixelRatio = 2.0;

      addTearDown(() {
        tester.view.resetPhysicalSize();
        tester.view.resetDevicePixelRatio();
      });

      await tester.pumpWidget(
        MaterialApp(
          theme: ThemeData.dark(useMaterial3: true),
          home: const ProviderScope(
            child: ${spec.screenName}(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      await expectLater(
        find.byType(${spec.screenName}),
        matchesGoldenFile('goldens/${snakeName}_dark_tablet.png'),
      );
    });
  });
}
`;

    const runCommand = "flutter test --update-goldens";
    const summary = `Generated visual golden test suite for ${baseName} across phone and tablet viewports in Light & Dark modes.`;

    return {
      testClassName,
      testCode,
      runCommand,
      summary
    };
  }
}
