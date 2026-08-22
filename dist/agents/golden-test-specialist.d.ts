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
export declare class FlutterGoldenTestSpecialistAgent extends BaseFlutterAgent {
    constructor();
    generateGoldenTests(spec: FlutterGoldenTestSpec): FlutterGoldenTestResult;
}
//# sourceMappingURL=golden-test-specialist.d.ts.map