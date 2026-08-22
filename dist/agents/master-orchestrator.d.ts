import { BaseFlutterAgent } from "./base-agent.js";
import { FullFlutterPipelineSpec, FullFlutterPipelineResult } from "../types.js";
export declare class FlutterMasterOrchestratorAgent extends BaseFlutterAgent {
    private decomposer;
    private researcher;
    private uiSpecialist;
    private backendSpecialist;
    private tester;
    constructor();
    orchestrateProject(spec: FullFlutterPipelineSpec): Promise<FullFlutterPipelineResult>;
}
//# sourceMappingURL=master-orchestrator.d.ts.map