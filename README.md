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

## 🌟 Specialized Agent Team

| Specialized Agent | Role & Tool Name | Key Responsibilities |
| :--- | :--- | :--- |
| 🧩 **Prompt Architect** | `decompose_flutter_prompt` | Validates target platforms (asks if missing), breaks down prompts into Clean Architecture features (P0/P1/P2), and builds sprint plans. |
| 🌐 **Dependency Researcher** | `research_flutter_dependencies` | Queries pub.dev, ensures Dart 3.6+ / Flutter 3.27+ compatibility, and generates `pubspec.yaml` & `analysis_options.yaml`. |
| 🎨 **UI / UX Specialist** | `design_flutter_ui` | Generates responsive Material 3 `ConsumerWidget` / `BlocBuilder` screens with `LayoutBuilder`, animations, and `const` optimizations. |
| ⚙️ **Backend Specialist** | `scaffold_flutter_backend` | Scaffolds Clean Architecture repositories, Dio REST / Supabase remote data sources, Drift/Hive caching, and Riverpod providers. |
| 🩺 **Compiler Doctor** | `diagnose_flutter_errors` | Diagnoses RenderFlex overflows, setState during build, pubspec solving conflicts, CocoaPods build errors, and Gradle namespace mismatches. |
| 🧪 **QA & Test Specialist** | `generate_and_run_flutter_tests` | Generates Unit tests with mocktail, Widget tests with `testWidgets`, and ProviderContainer tests. |
| 🔍 **Code Quality Auditor** | `audit_flutter_codebase` | Audits Flutter code for unclosed controllers, async calls in `build()`, and performance anti-patterns. |
| 🚀 **Master Orchestrator** | `orchestrate_flutter_project` | Coordinates the full multi-agent pipeline from platform verification to working project structure. |

---

## 📦 Installation & Setup

### 1. Build the MCP Server
```bash
git clone https://github.com/peter14l/flutter-agent-orchestrator.git
cd flutter-agent-orchestrator
npm install
npm run build
npm test
```

---

### 2. Antigravity CLI Integration

Add the server to your Antigravity configuration (`mcp_config.json` or `.agents/mcp.json`):

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

Or copy the skill to your project's `.agents/skills/` directory:
```bash
mkdir -p .agents/skills/flutter-orchestrator
cp SKILL.md .agents/skills/flutter-orchestrator/
```

---

### 3. OpenCode Integration

Add this entry to your OpenCode configuration (`~/.config/opencode/config.json` or project `opencode.json`):

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

---

## 🛠️ MCP Tools Overview

### 1. `orchestrate_flutter_project`
Runs the complete multi-agent pipeline from raw prompt to working project structure (verifying platforms first).
```json
{
  "prompt": "Build a finance portfolio manager with interactive charts and offline cache for iOS and Android",
  "projectName": "finance_tracker",
  "targetPlatforms": ["android", "ios"],
  "stateManagement": "riverpod"
}
```

### 2. `decompose_flutter_prompt`
Deconstructs requirements into technical specifications (prompts for platform if omitted).
```json
{
  "prompt": "Build a recipe discovery app with search, favorites, and step-by-step cooking mode",
  "targetPlatforms": ["android", "ios", "web"]
}
```

### 3. `research_flutter_dependencies`
Generates standard `pubspec.yaml` and `analysis_options.yaml`.
```json
{
  "projectName": "recipe_app",
  "targetPlatforms": ["android", "ios"],
  "stateManagement": "riverpod",
  "packages": ["dio", "supabase", "cached_network_image"]
}
```

### 4. `design_flutter_ui`
Generates responsive Material 3 widgets with Riverpod / Bloc.
```json
{
  "screenName": "RecipeDetailScreen",
  "targetPlatforms": ["android", "ios", "web"],
  "layoutDescription": "Header image, ingredients list with checkboxes, nutrition card, and start cooking button."
}
```

### 5. `scaffold_flutter_backend`
Scaffolds Clean Architecture repositories and remote data sources.
```json
{
  "featureName": "Recipe",
  "stateManagement": "riverpod",
  "backendProvider": "rest-dio",
  "database": "shared_preferences"
}
```

### 6. `diagnose_flutter_errors`
Diagnoses compilation errors, overflows, and runtime crashes.
```json
{
  "errorMessage": "A RenderFlex overflowed by 48 pixels on the bottom in Column(children: ...)"
}
```

### 7. `generate_and_run_flutter_tests`
Generates Unit and Widget tests with `testWidgets`.
```json
{
  "className": "RecipeScreen",
  "testType": "widget",
  "methodsOrWidgetsToTest": ["render", "tapFavorite"]
}
```

### 8. `audit_flutter_codebase`
Reviews Flutter code for performance and memory leaks.
```json
{
  "code": "class _State extends State<W> { TextEditingController c = TextEditingController(); }",
  "fileType": "widget"
}
```

---

## 🧪 Running Tests
```bash
npm test
```
All 10 unit and integration tests execute using Node's native test runner in ~120ms.
