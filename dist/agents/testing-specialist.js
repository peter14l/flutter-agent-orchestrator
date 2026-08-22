import { BaseFlutterAgent } from "./base-agent.js";
export class FlutterTestingSpecialistAgent extends BaseFlutterAgent {
    constructor() {
        super("FlutterTestingSpecialistAgent", "Flutter QA & Test Automation Specialist", "Generates Unit tests, Widget tests with testWidgets, Riverpod provider container tests, and mocktail mocks.");
    }
    generateTest(spec) {
        this.log("INFO", `Generating ${spec.testType} tests for ${spec.className}`);
        const baseName = spec.className.replace(/(Test|Screen|Controller|Repository)$/i, "");
        const testClassName = `${baseName}${spec.testType === "widget" ? "Screen" : "Controller"}Test`;
        const snakeName = baseName.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
        let testCode = "";
        const requiredPackages = ["flutter_test", "mocktail"];
        if (spec.testType === "widget") {
            testCode = `// test/widget/${snakeName}_screen_test.dart

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:app/features/${snakeName}/presentation/screens/${snakeName}_screen.dart';

void main() {
  group('${baseName}Screen Widget Tests', () {
    testWidgets('renders search bar and list items properly', (WidgetTester tester) async {
      // Build screen inside ProviderScope
      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: ${baseName}Screen(),
          ),
        ),
      );

      // Wait for initial frame & animations
      await tester.pumpAndSettle();

      // Verify search bar presence
      expect(find.byType(SearchBar), findsOneWidget);

      // Verify app bar title
      expect(find.text('${baseName}'), findsOneWidget);
    });

    testWidgets('tapping refresh button triggers reload', (WidgetTester tester) async {
      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: ${baseName}Screen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // Find refresh icon
      final refreshButton = find.byIcon(Icons.refresh);
      expect(refreshButton, findsOneWidget);

      await tester.tap(refreshButton);
      await tester.pump();
    });
  });
}
`;
        }
        else {
            // Unit test
            testCode = `// test/unit/${snakeName}_controller_test.dart

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mocktail/mocktail.dart';
import 'package:app/features/${snakeName}/presentation/controllers/${snakeName}_controller.dart';

void main() {
  group('${baseName}Controller Unit Tests', () {
    late ProviderContainer container;

    setUp(() {
      container = ProviderContainer();
    });

    tearDown(() {
      container.dispose();
    });

    test('initial state has default values and triggers loadItems', () async {
      final controller = container.read(${snakeName}ControllerProvider.notifier);
      final initialState = container.read(${snakeName}ControllerProvider);

      expect(initialState.searchQuery, isEmpty);
      expect(initialState.errorMessage, isNull);

      // Await async load
      await Future.delayed(const Duration(milliseconds: 700));

      final loadedState = container.read(${snakeName}ControllerProvider);
      expect(loadedState.isLoading, isFalse);
      expect(loadedState.items.isNotEmpty, isTrue);
    });

    test('updateSearchQuery updates state correctly', () {
      final controller = container.read(${snakeName}ControllerProvider.notifier);

      controller.updateSearchQuery('test query');

      final state = container.read(${snakeName}ControllerProvider);
      expect(state.searchQuery, equals('test query'));
    });
  });
}
`;
        }
        const runCommand = "flutter test";
        const coverageSummary = "Tests state transitions, widget hierarchy rendering, and user interactions without network side-effects.";
        return {
            testClassName,
            testCode,
            requiredPackages,
            runCommand,
            coverageSummary
        };
    }
}
//# sourceMappingURL=testing-specialist.js.map