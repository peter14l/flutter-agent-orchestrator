# Flutter Multi-Agent Orchestrator (MCP Server & Skill)

> **Enterprise-grade Multi-Agent System & Model Context Protocol (MCP) Server for building production-ready Flutter & Dart apps across Mobile (iOS/Android), Web (WASM), and Desktop (macOS/Windows/Linux) with Clean Architecture and Riverpod/Bloc.**

---

## 🎯 Target Platform Verification

Before starting execution, the **Prompt Architect Agent** checks if target platforms are mentioned in the prompt or arguments. If omitted, it automatically asks:

```
🎯 Target Platforms Required:
Which platform(s) are you targeting for this Flutter app?
1. 📱 Mobile: iOS & Android (Default)
2. 🌐 Web (Responsive WASM / HTML)
3. 💻 Desktop: macOS, Windows, Linux
4. 🚀 All Platforms (Mobile, Web, Desktop)
```

---

## 🌟 Complete Specialized Agent Team (13 Tools)

| Specialized Agent | Tool Name | Key Responsibilities |
| :--- | :--- | :--- |
| 🧩 **Prompt Architect** | `decompose_flutter_prompt` | Validates target platforms (asks if missing), breaks down prompts into Clean Architecture features (P0/P1/P2), and builds sprint plans. |
| 🌐 **Dependency Researcher** | `research_flutter_dependencies` | Queries pub.dev, ensures Dart 3.6+ / Flutter 3.27+ compatibility, and generates `pubspec.yaml` & `analysis_options.yaml`. |
| 🎨 **UI / UX Specialist** | `design_flutter_ui` | Generates responsive Material 3 `ConsumerWidget` / `BlocBuilder` screens with `LayoutBuilder`, animations, and `const` optimizations. |
| ⚙️ **Backend Specialist** | `scaffold_flutter_backend` | Scaffolds Clean Architecture repositories, Dio REST / Supabase remote data sources, Drift/Hive caching, and Riverpod providers. |
| 🩺 **Compiler Doctor** | `diagnose_flutter_errors` | Diagnoses RenderFlex overflows, setState during build, pubspec solving conflicts, CocoaPods build errors, and Gradle namespace mismatches. |
| 🧪 **QA & Test Specialist** | `generate_and_run_flutter_tests` | Generates Unit tests with mocktail, Widget tests with `testWidgets`, and ProviderContainer tests. |
| 🔍 **Code Quality Auditor** | `audit_flutter_codebase` | Audits Flutter code for unclosed controllers, async calls in `build()`, and performance anti-patterns. |
| 🌐 **Cross-Bridge Specialist** | `generate_flutter_api_bridge` | Generates type-safe Dio REST clients, matching Dart DTO models, Riverpod providers, and WebSocket realtime streams. |
| 📱 **Native Platform Specialist** | `generate_flutter_platform_config` | Generates iOS `Info.plist` permission strings, Android `AndroidManifest.xml` permissions, and Web WASM bootstrap. |
| 🚀 **CI/CD & DevOps Engineer** | `generate_flutter_cicd_pipeline` | Generates multi-platform GitHub Actions workflows (Android AppBundle, iOS IPA, Web WASM), and Fastlane release lanes. |
| 📸 **Visual Golden Specialist** | `generate_flutter_golden_tests` | Generates multi-device golden snapshot test suites across phone and tablet viewports in Light & Dark modes. |
| 🤖 **On-Device AI Specialist** | `scaffold_flutter_ai_module` | Scaffolds Google Generative AI (Gemini) SDK streaming integration, Riverpod controllers, and interactive chat views. |
| 🚀 **Master Orchestrator** | `orchestrate_flutter_project` | Coordinates the full multi-agent pipeline from platform verification to working project structure. |

---

## 📦 Installation & Setup

```bash
git clone https://github.com/peter14l/flutter-agent-orchestrator.git
cd flutter-agent-orchestrator
npm install
npm run build
npm test
```

### Antigravity CLI Integration
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

### OpenCode Integration
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
