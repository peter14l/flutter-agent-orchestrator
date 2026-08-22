import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterLocalizationSpec {
    defaultLocale?: string;
    supportedLocales: string[];
    stringKeys: Record<string, {
        en: string;
        es?: string;
        ar?: string;
        description?: string;
    }>;
}
export interface FlutterLocalizationResult {
    l10nYaml: string;
    arbEnJson: string;
    arbEsJson?: string;
    arbArJson?: string;
    localeProviderCode: string;
    summary: string;
}
export declare class FlutterLocalizationSpecialistAgent extends BaseFlutterAgent {
    constructor();
    generateLocalization(spec: FlutterLocalizationSpec): FlutterLocalizationResult;
}
//# sourceMappingURL=localization-specialist.d.ts.map