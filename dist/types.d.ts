export type FlutterPlatform = "android" | "ios" | "web" | "macos" | "windows" | "linux";
export type FlutterStateManagement = "riverpod" | "bloc" | "provider" | "signals";
export type FlutterArchitecture = "feature-first-clean-architecture" | "layer-first-clean-architecture" | "mvc";
export interface PlatformCheckResult {
    isPlatformSpecified: boolean;
    detectedPlatforms: FlutterPlatform[];
    clarificationMessage?: string;
    recommendedOptions: FlutterPlatform[];
}
export interface FeatureSpec {
    id: string;
    name: string;
    description: string;
    platforms: FlutterPlatform[];
    priority: "P0-Critical" | "P1-High" | "P2-Medium" | "P3-Low";
    layer: "presentation" | "domain" | "data" | "core" | "test";
    dependencies: string[];
    components: string[];
    acceptanceCriteria: string[];
}
export interface FlutterArchitecturePlan {
    projectName: string;
    targetPlatforms: FlutterPlatform[];
    stateManagement: FlutterStateManagement;
    architecturePattern: FlutterArchitecture;
    needsPlatformClarification: boolean;
    platformClarificationPrompt?: string;
    summary: string;
    folderStructure: {
        path: string;
        description: string;
    }[];
    features: FeatureSpec[];
    executionPhases: {
        phase: number;
        title: string;
        description: string;
        features: string[];
    }[];
    concurrencyAndStateStrategy: string;
    routingStrategy: string;
}
export interface PubPackageInfo {
    name: string;
    latestVersion: string;
    category: "state" | "network" | "storage" | "ui" | "routing" | "testing" | "utility";
    description: string;
    devDependency?: boolean;
}
export interface PubspecResult {
    projectName: string;
    description: string;
    flutterSdk: string;
    dartSdk: string;
    targetPlatforms: FlutterPlatform[];
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    pubspecYaml: string;
    analysisOptionsYaml: string;
}
export interface UIWidgetSpec {
    screenName: string;
    targetPlatforms: FlutterPlatform[];
    stateManagement: FlutterStateManagement;
    layoutDescription: string;
    includeMaterial3?: boolean;
    includeAdaptive?: boolean;
    includeAnimations?: boolean;
    includeGoldenTests?: boolean;
}
export interface UIWidgetResult {
    screenName: string;
    widgetCode: string;
    stateHolderCode: string;
    modelCode: string;
    filePaths: {
        view: string;
        controller: string;
        model: string;
    };
    explanation: string;
}
export interface BackendAndStateSpec {
    featureName: string;
    stateManagement: FlutterStateManagement;
    backendProvider: "rest-dio" | "supabase" | "firebase" | "graphql";
    database: "drift" | "hive_ce" | "isar" | "shared_preferences";
    entities: {
        name: string;
        fields: Record<string, string>;
    }[];
}
export interface BackendAndStateResult {
    featureName: string;
    entityCode: string;
    modelCode: string;
    repositoryInterfaceCode: string;
    repositoryImplCode: string;
    remoteDataSourceCode: string;
    stateNotifierCode: string;
    fileTree: Record<string, string>;
    summary: string;
}
export interface FlutterErrorDiagnosticInput {
    errorMessage: string;
    stackTrace?: string;
    codeSnippet?: string;
    pubspecContent?: string;
    flutterDoctorOutput?: string;
}
export interface FlutterErrorDiagnosticResult {
    errorType: "RENDERFLEX_OVERFLOW" | "SETSTATE_DURING_BUILD" | "PUBSPEC_CONFLICT" | "NULL_SAFETY_CRASH" | "COCOAPODS_BUILD_ERROR" | "GRADLE_NAMESPACE" | "RIVERPOD_UNRESOLVED";
    rootCause: string;
    suggestedFix: string;
    fixedCodeSnippet?: string;
    pubspecFix?: string;
    preventiveAdvice: string;
    referenceLinks: string[];
}
export interface FlutterTestSpec {
    className: string;
    testType: "unit" | "widget" | "golden" | "integration";
    stateManagement: FlutterStateManagement;
    methodsOrWidgetsToTest: string[];
    targetCode?: string;
}
export interface FlutterTestResult {
    testClassName: string;
    testCode: string;
    requiredPackages: string[];
    runCommand: string;
    coverageSummary: string;
}
export interface FullFlutterPipelineSpec {
    prompt: string;
    projectName?: string;
    targetPlatforms?: FlutterPlatform[];
    stateManagement?: FlutterStateManagement;
    includeUi?: boolean;
    includeBackend?: boolean;
    includeTests?: boolean;
}
export interface FullFlutterPipelineResult {
    projectName: string;
    targetPlatforms: FlutterPlatform[];
    needsPlatformClarification: boolean;
    platformClarificationPrompt?: string;
    architecture?: FlutterArchitecturePlan;
    pubspec?: PubspecResult;
    uiModules?: UIWidgetResult[];
    backendModules?: BackendAndStateResult;
    testSuites?: FlutterTestResult[];
    setupInstructions: string;
    nextSteps: string[];
}
//# sourceMappingURL=types.d.ts.map