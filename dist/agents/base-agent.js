export class BaseFlutterAgent {
    name;
    role;
    description;
    logs = [];
    constructor(name, role, description) {
        this.name = name;
        this.role = role;
        this.description = description;
    }
    log(level, message) {
        this.logs.push({
            timestamp: new Date().toISOString(),
            level,
            message
        });
    }
    getLogs() {
        return [...this.logs];
    }
    clearLogs() {
        this.logs = [];
    }
}
//# sourceMappingURL=base-agent.js.map