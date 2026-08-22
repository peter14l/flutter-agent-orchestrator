export interface FlutterAgentLog {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "DEBUG";
  message: string;
}

export abstract class BaseFlutterAgent {
  public readonly name: string;
  public readonly role: string;
  public readonly description: string;
  protected logs: FlutterAgentLog[] = [];

  constructor(name: string, role: string, description: string) {
    this.name = name;
    this.role = role;
    this.description = description;
  }

  protected log(level: "INFO" | "WARN" | "ERROR" | "DEBUG", message: string) {
    this.logs.push({
      timestamp: new Date().toISOString(),
      level,
      message
    });
  }

  public getLogs(): FlutterAgentLog[] {
    return [...this.logs];
  }

  public clearLogs() {
    this.logs = [];
  }
}
