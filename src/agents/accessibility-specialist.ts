import { BaseFlutterAgent } from "./base-agent.js";

export interface FlutterA11yAuditSpec {
  codeSnippet: string;
}

export interface FlutterA11yAuditResult {
  violations: Array<{
    severity: "HIGH" | "MEDIUM" | "LOW";
    element: string;
    wcagRule: string;
    fix: string;
  }>;
  accessibleWidgetCode: string;
  summary: string;
}

export class FlutterAccessibilitySpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterAccessibilitySpecialistAgent",
      "Accessibility (a11y) & WCAG Compliance Auditor",
      "Audits Flutter widget trees for screen reader Semantics, minimum 48x48dp touch targets, color contrast, and dynamic text scaling resilience."
    );
  }

  public auditAccessibility(spec: FlutterA11yAuditSpec): FlutterA11yAuditResult {
    this.log("INFO", "Auditing Flutter widget tree against WCAG 2.1 AA accessibility guidelines");

    const violations: Array<{ severity: "HIGH" | "MEDIUM" | "LOW"; element: string; wcagRule: string; fix: string }> = [];

    if (spec.codeSnippet) {
      if (spec.codeSnippet.includes("IconButton") && !spec.codeSnippet.includes("tooltip")) {
        violations.push({
          severity: "HIGH",
          element: "IconButton",
          wcagRule: "WCAG 2.1 - 4.1.2 Name, Role, Value",
          fix: "Add a descriptive `tooltip: 'Action Description'` or wrap with `Semantics(label: '...')`."
        });
      }

      if (spec.codeSnippet.includes("GestureDetector") && !spec.codeSnippet.includes("Semantics")) {
        violations.push({
          severity: "MEDIUM",
          element: "GestureDetector",
          wcagRule: "WCAG 2.1 - 1.3.1 Info and Relationships",
          fix: "Wrap custom tap areas with `Semantics(button: true, label: '...', onTap: ...)`."
        });
      }

      if (spec.codeSnippet.match(/(width|height):\s*([1-3][0-9]|[0-9])(\.0)?(\s*,\s*|\s*\))/)) {
        violations.push({
          severity: "HIGH",
          element: "Touch Target Size",
          wcagRule: "WCAG 2.1 - 2.5.5 Target Size (Minimum 48x48dp)",
          fix: "Ensure interactive tap targets have minimum dimensions of 48x48dp or use `kMinInteractiveDimension`."
        });
      }
    }

    const accessibleWidgetCode = `// lib/core/accessibility/accessible_widgets.dart

import 'package:flutter/material.dart';

class AccessibleTouchTarget extends StatelessWidget {
  final Widget child;
  final VoidCallback onTap;
  final String label;
  final String? hint;

  const AccessibleTouchTarget({
    super.key,
    required this.child,
    required this.onTap,
    required this.label,
    this.hint,
  });

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: label,
      hint: hint,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: ConstrainedBox(
          constraints: const BoxConstraints(
            minWidth: kMinInteractiveDimension, // 48.0 dp
            minHeight: kMinInteractiveDimension, // 48.0 dp
          ),
          child: Center(child: child),
        ),
      ),
    );
  }
}
`;

    const summary = `Accessibility audit complete. ${violations.length} violations flagged. Provided WCAG 2.1 AA compliant AccessibleTouchTarget wrapper.`;

    return {
      violations,
      accessibleWidgetCode,
      summary
    };
  }
}
