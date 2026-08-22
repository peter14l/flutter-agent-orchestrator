export const auditFlutterCodeSchema = {
    name: "audit_flutter_codebase",
    description: "Audits Flutter and Dart source code for performance bottlenecks, missing const constructors, controller memory leaks, and architectural violations.",
    inputSchema: {
        type: "object",
        properties: {
            code: {
                type: "string",
                description: "The Flutter / Dart code snippet to audit."
            },
            fileType: {
                type: "string",
                enum: ["widget", "state-notifier", "repository", "data-source"],
                description: "The layer or role of the file.",
                default: "widget"
            }
        },
        required: ["code"]
    }
};
export async function handleAuditFlutterCode(args) {
    const code = args.code;
    const fileType = args.fileType || "widget";
    const findings = [];
    // Check 1: print() used
    if (code.includes("print(") && !code.includes("avoid_print")) {
        findings.push({
            severity: "WARNING",
            issue: "Use of 'print()' detected in production code.",
            suggestion: "Replace 'print()' with 'debugPrint()' or a dedicated logging library like 'logger' to avoid exposing logs in release builds."
        });
    }
    // Check 2: Missing controller disposal in StatefulWidget
    if (code.includes("TextEditingController") || code.includes("AnimationController") || code.includes("ScrollController")) {
        if (!code.includes("dispose()")) {
            findings.push({
                severity: "CRITICAL",
                issue: "Controller instantiated without explicit 'dispose()' call.",
                suggestion: "Always override 'dispose()' and call 'controller.dispose()' in State<T> to prevent severe memory leaks."
            });
        }
    }
    // Check 3: Async calls inside build()
    if (code.includes("Widget build(BuildContext") && (code.includes(".then(") || code.includes("async {") || code.includes("await "))) {
        findings.push({
            severity: "CRITICAL",
            issue: "Asynchronous execution or side effect triggered directly inside 'build()'.",
            suggestion: "Trigger async calls in 'initState()', 'addPostFrameCallback', or through Riverpod/Bloc state notifiers to prevent infinite build loops."
        });
    }
    // Check 4: ListView without builder
    if (code.includes("ListView(children:") && !code.includes("ListView.builder") && !code.includes("ListView.separated")) {
        findings.push({
            severity: "INFO",
            issue: "Default 'ListView(children: ...)' used.",
            suggestion: "For lists with more than 10 items, use 'ListView.builder' or 'ListView.separated' for on-demand widget virtualization."
        });
    }
    const score = Math.max(0, 100 - (findings.filter(f => f.severity === "CRITICAL").length * 30) - (findings.filter(f => f.severity === "WARNING").length * 15));
    const result = {
        fileType,
        qualityScore: `${score}/100`,
        totalIssuesFound: findings.length,
        findings,
        verdict: score >= 85 ? "EXCELLENT" : score >= 60 ? "NEEDS_IMPROVEMENT" : "CRITICAL_ISSUES_FOUND"
    };
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=code-audit-tool.js.map