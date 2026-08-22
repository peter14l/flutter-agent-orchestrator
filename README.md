# Flutter Multi-Agent Orchestrator (MCP Server & Skill)

> **Enterprise-grade Multi-Agent System & Model Context Protocol (MCP) Server for building production-ready Flutter & Dart apps across Mobile (iOS/Android), Web (WASM), and Desktop (macOS/Windows/Linux) with Clean Architecture, Riverpod/Bloc, and Hackathon Fast Prototyping.**

---

## 🎯 Target Platform Pre-Check Rule

Before starting execution, if target platforms are not specified in the prompt or arguments, the **Prompt Architect Agent** pauses and requests platform clarification:

```
🎯 Target Platforms Required:
Which platform(s) are you targeting for this Flutter app?
1. 📱 Mobile: iOS & Android (Default)
2. 🌐 Web (Responsive WASM / HTML)
3. 💻 Desktop: macOS, Windows, Linux
4. 🚀 All Platforms (Mobile, Web, Desktop)
```

---

## 🌟 Complete Specialized Agent Roster (23 Tools)

### 🚀 Core Architecture & Engineering Agents
| Specialized Agent | MCP Tool Name | Description & Key Responsibilities | How to Call |
| :--- | :--- | :--- | :--- |
| 🧩 **Prompt Architect** | `decompose_flutter_prompt` | Validates target platforms (asks if missing), breaks down prompts into Clean Architecture features (P0/P1/P2), and builds sprint plans. | `decompose_flutter_prompt({ prompt: "...", targetPlatforms: ["ios", "android"] })` |
| 🌐 **Dependency Researcher** | `research_flutter_dependencies` | Queries pub.dev, ensures Dart 3.6+ / Flutter 3.27+ compatibility, and generates `pubspec.yaml` & `analysis_options.yaml`. | `research_flutter_dependencies({ projectName: "my_app", stateManagement: "riverpod" })` |
| 🎨 **UI / UX Specialist** | `design_flutter_ui` | Generates responsive Material 3 `ConsumerWidget` screens with domain archetype detection (Fintech, E-Commerce, Fitness, AI, Dashboards), 8-pt spatial grid, and fluid micro-animations. | `design_flutter_ui({ screenName: "DashboardScreen", layoutDescription: "..." })` |
| ⚙️ **Backend Specialist** | `scaffold_flutter_backend` | Scaffolds Clean Architecture repositories, Dio REST / Supabase remote data sources, Drift/Hive caching, and Riverpod providers. | `scaffold_flutter_backend({ featureName: "Order", backendProvider: "rest-dio" })` |
| 🩺 **Compiler Doctor** | `diagnose_flutter_errors` | Diagnoses RenderFlex overflows, setState during build, pubspec solving conflicts, CocoaPods build errors, and Gradle namespace mismatches. | `diagnose_flutter_errors({ errorMessage: "RenderFlex overflowed by 48px..." })` |
| 🧪 **QA & Test Specialist** | `generate_and_run_flutter_tests` | Generates Unit tests with mocktail, Widget tests with `testWidgets`, and ProviderContainer tests. | `generate_and_run_flutter_tests({ className: "OrderScreen", testType: "widget" })` |
| 🔍 **Code Quality Auditor** | `audit_flutter_codebase` | Audits Flutter code for unclosed controllers, async calls in `build()`, and performance anti-patterns. | `audit_flutter_codebase({ code: "...", fileType: "widget" })` |
| 🌐 **Cross-Bridge Specialist** | `generate_flutter_api_bridge` | Generates type-safe Dio REST clients, matching Dart DTO models, Riverpod providers, and WebSocket realtime streams. | `generate_flutter_api_bridge({ serviceName: "Order", endpoints: [...] })` |
| 📱 **Native Platform Specialist** | `generate_flutter_platform_config` | Generates iOS `Info.plist` permission strings, Android `AndroidManifest.xml` permissions, and Web WASM bootstrap. | `generate_flutter_platform_config({ projectName: "MyApp", permissions: ["camera", "location"] })` |
| 🚀 **CI/CD & DevOps Engineer** | `generate_flutter_cicd_pipeline` | Generates multi-platform GitHub Actions workflows with Split-per-ABI signed APKs, automated `gh secret set` keystore setup, Windows MSIX test-cert signing, and Fastlane. | `generate_flutter_cicd_pipeline({ projectName: "MyApp", enableSplitPerAbiApk: true })` |
| 📸 **Visual Golden Specialist** | `generate_flutter_golden_tests` | Generates multi-device golden snapshot test suites across phone and tablet viewports in Light & Dark modes. | `generate_flutter_golden_tests({ screenName: "DashboardScreen" })` |
| 🤖 **On-Device AI Specialist** | `scaffold_flutter_ai_module` | Scaffolds Google Generative AI (Gemini) SDK streaming integration, Riverpod controllers, and interactive chat views. | `scaffold_flutter_ai_module({ featureName: "ChatAssistant", provider: "google-generative-ai" })` |
| 🔐 **Security & Crypto Auditor** | `audit_flutter_security` | Audits Flutter code for secret leaks, scaffolds hardware-backed Keychain/Keystore `FlutterSecureStorage`, Biometric Auth, and SSL Pinning. | `audit_flutter_security({ codeSnippet: "...", enableBiometrics: true })` |
| 💾 **Database Architect** | `scaffold_flutter_database` | Scaffolds type-safe Drift (SQLite) database schemas, reactive DAOs, and schema version migration routines. | `scaffold_flutter_database({ databaseName: "Expense", tables: [...] })` |
| 🌍 **Localization (i18n) Specialist** | `generate_flutter_localization` | Generates `l10n.yaml`, ARB localization files (en, es, ar), dynamic locale switcher, and Right-to-Left (RTL) language handling. | `generate_flutter_localization({ supportedLocales: ["en", "es", "ar"], stringKeys: {...} })` |
| 📊 **Observability & Analytics Specialist** | `scaffold_flutter_observability` | Scaffolds Sentry/Firebase Crashlytics crash reporting, type-safe custom analytics event taxonomy, and HTTP latency interceptors. | `scaffold_flutter_observability({ provider: "sentry", customEventNames: ["checkout_done"] })` |
| 🔗 **Deep Linking & Push Specialist** | `configure_flutter_deep_links` | Configures `go_router` deep links, Android App Links (`assetlinks.json`), iOS Universal Links (`apple-app-site-association`), and FCM notification routing. | `configure_flutter_deep_links({ customScheme: "myapp", domainHost: "app.example.com", routes: [...] })` |
| ♿ **Accessibility (a11y) Auditor** | `audit_flutter_accessibility` | Audits Flutter widgets for WCAG 2.1 AA compliance, screen reader Semantics, minimum 48x48dp touch targets, and scaffolds `AccessibleTouchTarget`. | `audit_flutter_accessibility({ codeSnippet: "IconButton(icon: Icon(Icons.add), ...)" })` |
| 🚀 **Master Orchestrator** | `orchestrate_flutter_project` | Coordinates the entire multi-agent pipeline from platform verification to working project structure. | `orchestrate_flutter_project({ prompt: "...", targetPlatforms: ["android", "ios"] })` |

### ⚡ Hackathon Fast-Prototyping Agents
| Specialized Agent | MCP Tool Name | Description & Key Responsibilities | How to Call |
| :--- | :--- | :--- | :--- |
| 🎭 **Demo Data & Mock Factory** | `generate_flutter_mock_factory` | Generates deterministic domain mock data factories, fake entities, and in-memory simulated Riverpod repositories for instant UI prototyping. | `generate_flutter_mock_factory({ domainName: "Product", itemCount: 10 })` |
| 🔐 **Auth & Onboarding Specialist** | `scaffold_flutter_auth_flow` | Scaffolds an animated Onboarding carousel (PageView with dots), Material 3 Social login UI (Google/Apple/Email), and token-persisting Riverpod Auth controllers. | `scaffold_flutter_auth_flow({ appName: "HackathonApp" })` |
| 📈 **Charts & Data Storytelling** | `generate_flutter_charts` | Scaffolds interactive animated Line charts, Bar graphs, and Donut charts via `fl_chart` with gradient fills and tooltips. | `generate_flutter_charts({ chartTitle: "Revenue Trends", chartType: "line" })` |
| 🛡️ **Hackathon Demo Resilience** | `scaffold_flutter_offline_resilience` | Guarantees zero crashes during live stage pitches by wrapping network repositories in an automatic fallback interceptor that catches Wi-Fi drops and seamlessly serves cached mock data. | `scaffold_flutter_offline_resilience({ enableDemoMockFallback: true })` |

---

## 📦 Installation & Setup

```bash
git clone https://github.com/peter14l/flutter-agent-orchestrator.git
cd flutter-agent-orchestrator
npm install
npm run build
npm test
```
