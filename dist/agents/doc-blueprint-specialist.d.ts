import { BaseFlutterAgent } from "./base-agent.js";
export interface DocBlueprintSpec {
    projectName: string;
    appDescription: string;
    targetPlatforms?: string[];
    projectType?: "production" | "enterprise" | "hackathon" | "mvp" | "general";
    preferredArchitecture?: string;
    designPreferences?: {
        colorTheme?: string;
        typography?: string;
        navigationStyle?: string;
        darkMode?: boolean;
    };
    outputDirectory?: string;
    overwriteExisting?: boolean;
}
export interface DocBlueprintResult {
    generatedFiles: Array<{
        fileName: string;
        filePath: string;
        status: "created" | "skipped_already_exists" | "overwritten";
    }>;
    clarificationQuestionsNeeded?: string[];
    documents: {
        prdMd?: string;
        architectureMd?: string;
        rulesMd?: string;
        phasesMd?: string;
        designMd?: string;
        memoryMd?: string;
    };
    summary: string;
}
export declare class FlutterDocBlueprintSpecialistAgent extends BaseFlutterAgent {
    constructor();
    scaffoldDocuments(spec: DocBlueprintSpec): DocBlueprintResult;
}
//# sourceMappingURL=doc-blueprint-specialist.d.ts.map