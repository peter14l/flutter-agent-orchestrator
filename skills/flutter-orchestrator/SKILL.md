---
name: flutter-agent-orchestrator
description: >-
  Multi-agent orchestrator for building Flutter & Dart applications across Mobile (iOS/Android), Web (WASM), and Desktop (macOS/Windows/Linux).
  Spawns specialized agents for platform verification, prompt decomposition, pub.dev package research, Material 3 UI design, Clean Architecture scaffolding, error diagnostics, and automated testing.
---

# Flutter Multi-Agent Orchestrator

The **Flutter Agent Orchestrator** is an enterprise-grade Pair-Programming & Multi-Agent engine designed to build scalable, multi-platform Flutter apps with Clean Architecture, Riverpod/Bloc state management, and 120fps smooth performance.

## 🎯 Target Platform Verification Rule

> **Important**: Before starting execution, if the target platforms are not specified in the prompt or arguments (e.g. iOS, Android, Web, macOS, Windows, Linux), the **Prompt Architect Agent** will automatically request clarification to ensure platform-specific configurations, permissions, and responsive layouts are properly tailored.

---

## 🌟 Specialized Agent Roster

1. **FlutterPromptArchitectAgent (`decompose_flutter_prompt`)**:
   - Checks and prompts for target platforms (iOS, Android, Web, Desktop) if omitted.
   - Deconstructs raw prompts into Clean Architecture features (P0/P1/P2) and GoRouter routes.
   - Generates modular sprint phases and acceptance criteria.

2. **FlutterDependencyResearcherAgent (`research_flutter_dependencies`)**:
   - Queries pub.dev and ensures compatibility with Dart 3.6+ and Flutter 3.27+.
   - Generates standard `pubspec.yaml` with version constraints and `analysis_options.yaml`.

3. **FlutterUISpecialistAgent (`design_flutter_ui`)**:
   - Generates responsive Material 3 `ConsumerWidget` / `BlocBuilder` screens.
   - Integrates `LayoutBuilder` / `ConstrainedBox` for Mobile, Web, and Desktop viewports.
   - Enforces `const` constructors everywhere for optimal GC and fluid 120fps animations.

4. **FlutterBackendSpecialistAgent (`scaffold_flutter_backend`)**:
   - Scaffolds Clean Architecture repositories, Dio REST / Supabase remote data sources, Drift/Hive caching, and Riverpod providers.

5. **FlutterErrorDiagnosticianAgent (`diagnose_flutter_errors`)**:
   - Diagnoses RenderFlex overflow errors, setState during build, pubspec solving conflicts, CocoaPods build errors, and Gradle namespace mismatches.

6. **FlutterTestingSpecialistAgent (`generate_and_run_flutter_tests`)**:
   - Generates Unit tests with mocktail, Widget tests with `testWidgets`, and ProviderContainer tests.

7. **FlutterCodeAuditAgent (`audit_flutter_codebase`)**:
   - Audits Flutter code for unclosed controllers, async calls in `build()`, and performance anti-patterns.

8. **FlutterMasterOrchestratorAgent (`orchestrate_flutter_project`)**:
   - Coordinates the full multi-agent pipeline from platform verification to working project structure.

---

## Antigravity CLI Installation

Add to `mcp_config.json` or `.agents/mcp.json`:

```json
{
  "mcpServers": {
    "flutter-orchestrator": {
      "command": "node",
      "args": ["C:/Users/LOQ/flutter-agent-orchestrator/dist/index.js"]
    }
  }
}
```

---

## OpenCode Installation

Add this entry to your OpenCode configuration (`~/.config/opencode/config.json` or `opencode.json`):

```json
{
  "mcp": {
    "servers": {
      "flutter-orchestrator": {
        "command": "node",
        "args": ["C:/Users/LOQ/flutter-agent-orchestrator/dist/index.js"],
        "enabled": true
      }
    }
  }
}
```
