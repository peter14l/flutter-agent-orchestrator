export interface FlutterAgentLog {
    timestamp: string;
    level: "INFO" | "WARN" | "ERROR" | "DEBUG";
    message: string;
}
export declare abstract class BaseFlutterAgent {
    readonly name: string;
    readonly role: string;
    readonly description: string;
    protected logs: FlutterAgentLog[];
    constructor(name: string, role: string, description: string);
    protected log(level: "INFO" | "WARN" | "ERROR" | "DEBUG", message: string): void;
    getLogs(): FlutterAgentLog[];
    clearLogs(): void;
}
//# sourceMappingURL=base-agent.d.ts.map