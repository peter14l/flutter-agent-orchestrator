import { FlutterAccessibilitySpecialistAgent, FlutterA11yAuditSpec } from "../agents/accessibility-specialist.js";

const agent = new FlutterAccessibilitySpecialistAgent();

export const auditFlutterAccessibilitySchema = {
  name: "audit_flutter_accessibility",
  description: "Audits Flutter widget trees against WCAG 2.1 AA guidelines, checks screen reader Semantics, minimum 48x48dp touch targets, and generates AccessibleTouchTarget wrappers.",
  inputSchema: {
    type: "object",
    properties: {
      codeSnippet: {
        type: "string",
        description: "Flutter widget code to audit."
      }
    },
    required: ["codeSnippet"]
  }
};

export async function handleAuditFlutterAccessibility(args: any) {
  const spec: FlutterA11yAuditSpec = {
    codeSnippet: args.codeSnippet || ""
  };

  const result = agent.auditAccessibility(spec);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
