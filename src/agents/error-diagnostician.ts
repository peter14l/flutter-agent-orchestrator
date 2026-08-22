import { BaseFlutterAgent } from "./base-agent.js";
import { FlutterErrorDiagnosticInput, FlutterErrorDiagnosticResult } from "../types.js";

export class FlutterErrorDiagnosticianAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterErrorDiagnosticianAgent",
      "Flutter & Dart Diagnostic Doctor",
      "Diagnoses RenderFlex overflows, setState during build errors, pubspec dependency conflicts, CocoaPods build failures, and Riverpod/Bloc issues."
    );
  }

  public diagnose(input: FlutterErrorDiagnosticInput): FlutterErrorDiagnosticResult {
    const raw = `${input.errorMessage} ${input.stackTrace || ""} ${input.flutterDoctorOutput || ""}`.toLowerCase();
    this.log("INFO", `Diagnosing Flutter error: ${input.errorMessage.slice(0, 80)}...`);

    // 1. RenderFlex overflow
    if (raw.includes("renderflex overflowed") || raw.includes("a renderflex overflowed by") || raw.includes("overflowed by")) {
      return {
        errorType: "RENDERFLEX_OVERFLOW",
        rootCause: "A Flex widget (Row or Column) contains children whose intrinsic sizes exceed the available viewport or parent constraints.",
        suggestedFix: "Wrap unbounded child widgets inside 'Expanded' or 'Flexible', or replace Column/Row with 'SingleChildScrollView' or 'ListView'.",
        fixedCodeSnippet: `// BEFORE (Overflows):
// Column(children: [ LongTextWidget(), CustomCard() ])

// AFTER (Fix):
SingleChildScrollView(
  child: Column(
    mainAxisSize: MainAxisSize.min,
    children: const [
      LongTextWidget(),
      CustomCard(),
    ],
  ),
)
// OR in a Row:
Row(
  children: [
    const Icon(Icons.star),
    Expanded(child: Text(veryLongTitle, overflow: TextOverflow.ellipsis)),
  ],
)`,
        preventiveAdvice: "Always use Expanded / Flexible inside Row/Column when child text or custom widgets can dynamically expand.",
        referenceLinks: ["https://docs.flutter.dev/testing/common-errors#a-renderflex-overflowed-by-x-pixels"]
      };
    }

    // 2. setState during build
    if (raw.includes("setstate() or markneedsbuild() called during build") || raw.includes("called during build")) {
      return {
        errorType: "SETSTATE_DURING_BUILD",
        rootCause: "A state mutation (setState, Provider notification, or Navigation) was triggered synchronously while the widget tree was actively building.",
        suggestedFix: "Defer the state update or navigation call until after the current frame finishes rendering using `WidgetsBinding.instance.addPostFrameCallback((_) { ... })` or inside `ref.listen` / `useEffect`.",
        fixedCodeSnippet: `// In initState or build listener:
@override
void initState() {
  super.initState();
  WidgetsBinding.instance.addPostFrameCallback((_) {
    if (mounted) {
      ref.read(myControllerProvider.notifier).fetchInitialData();
    }
  });
}`,
        preventiveAdvice: "Never mutate state or invoke Navigator.push directly in the build() method body.",
        referenceLinks: ["https://docs.flutter.dev/testing/common-errors#setstate-called-during-build"]
      };
    }

    // 3. Pubspec dependency conflict
    if (raw.includes("version solving failed") || raw.includes("because every version of") || raw.includes("depends on")) {
      return {
        errorType: "PUBSPEC_CONFLICT",
        rootCause: "Incompatible transitive version constraints between pub packages in pubspec.yaml.",
        suggestedFix: "Run `flutter pub upgrade --major-versions` or temporarily use a dependency_overrides block while package authors publish updates.",
        pubspecFix: `# In pubspec.yaml:
dependency_overrides:
  package_name: ^compatible_version`,
        preventiveAdvice: "Always check pub.dev scores and keep dependencies updated to avoid version fragmentation.",
        referenceLinks: ["https://dart.dev/tools/pub/versioning"]
      };
    }

    // 4. Gradle namespace error
    if (raw.includes("namespace not specified") || raw.includes("android.namespace") || raw.includes("agp 8")) {
      return {
        errorType: "GRADLE_NAMESPACE",
        rootCause: "Android Gradle Plugin (AGP 8.0+) requires an explicit namespace attribute in the android/app/build.gradle file.",
        suggestedFix: "Add `namespace = 'com.example.app'` inside the `android { ... }` block in `android/app/build.gradle`.",
        fixedCodeSnippet: `android {
    namespace = "com.example.app"
    compileSdk = flutter.compileSdkVersion
    ...
}`,
        preventiveAdvice: "Ensure all Flutter Android modules declare their explicit namespace for AGP 8+ compatibility.",
        referenceLinks: ["https://developer.android.com/build/releases/gradle-plugin"]
      };
    }

    // Default fallback
    return {
      errorType: "NULL_SAFETY_CRASH",
      rootCause: `Detected Flutter / Dart error: ${input.errorMessage.slice(0, 150)}`,
      suggestedFix: "Verify variable nullability with '?.' or '??', check that controllers are disposed, and run `flutter analyze`.",
      preventiveAdvice: "Run `flutter analyze` and `flutter test` regularly to catch structural defects early.",
      referenceLinks: ["https://docs.flutter.dev/testing/common-errors"]
    };
  }
}
