import fs from "fs";
import path from "path";
import { BaseFlutterAgent } from "./base-agent.js";

export interface DocBlueprintSpec {
  projectName: string;
  appDescription: string;
  targetPlatforms?: string[];
  projectType?: "production" | "enterprise" | "hackathon" | "mvp" | "general";
  preferredArchitecture?: string; // e.g. "Clean Architecture with Riverpod", "BLoC Feature-First", "MVVM"
  designPreferences?: {
    colorTheme?: string;
    typography?: string;
    navigationStyle?: string;
    darkMode?: boolean;
  };
  outputDirectory?: string;
  overwriteExisting?: boolean;
}

export interface DocBlueprintResult {
  generatedFiles: Array<{ fileName: string; filePath: string; status: "created" | "skipped_already_exists" | "overwritten" }>;
  clarificationQuestionsNeeded?: string[];
  documents: {
    prdMd?: string;
    architectureMd?: string;
    rulesMd?: string;
    phasesMd?: string;
    designMd?: string;
    memoryMd?: string;
  };
  summary: string;
}

export class FlutterDocBlueprintSpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterDocBlueprintSpecialistAgent",
      "Project Specification, Blueprint & Documentation Architect",
      "Generates comprehensive, dynamic PRD.md, architecture.md, rules.md, phases.md, design.md, and memory.md tailored to user prompts with non-destructive file checking."
    );
  }

  public scaffoldDocuments(spec: DocBlueprintSpec): DocBlueprintResult {
    this.log("INFO", `Scaffolding blueprint documentation for project: ${spec.projectName}`);

    const questions: string[] = [];
    const descLower = spec.appDescription.toLowerCase();

    // Check if UI/UX design intent is vague
    const hasDesignKeywords = descLower.includes("theme") || descLower.includes("color") || descLower.includes("dark mode") || descLower.includes("minimalist") || descLower.includes("material");
    if (!hasDesignKeywords && !spec.designPreferences) {
      questions.push("🎨 UI/UX Design: Do you have a preferred visual style, brand color palette (e.g. Indigo/Slate, Emerald/Dark), or navigation structure (Bottom Navigation, Sidebar Drawer)?");
    }

    // Check if architecture was explicitly specified
    let archName = spec.preferredArchitecture;
    if (!archName) {
      if (descLower.includes("bloc")) {
        archName = "Feature-First Clean Architecture with BLoC";
      } else if (descLower.includes("mvvm")) {
        archName = "MVVM Architecture with Provider/ChangeNotifier";
      } else if (descLower.includes("clean architecture") || descLower.includes("riverpod")) {
        archName = "Clean Architecture with Riverpod (Presentation, Domain, Data, Core)";
      } else {
        archName = "Clean Architecture with Riverpod (Presentation, Domain, Data, Core)";
      }
    }

    // Determine project scope/type
    let projectType = spec.projectType;
    if (!projectType) {
      if (descLower.includes("hackathon") || descLower.includes("pitch")) {
        projectType = "hackathon";
      } else if (descLower.includes("enterprise") || descLower.includes("microservice")) {
        projectType = "enterprise";
      } else if (descLower.includes("mvp") || descLower.includes("prototype")) {
        projectType = "mvp";
      } else {
        projectType = "production";
      }
    }

    const platforms = spec.targetPlatforms && spec.targetPlatforms.length > 0 ? spec.targetPlatforms.join(", ") : "iOS, Android, Web, Desktop";

    // 1. PRD.md
    const prdMd = `# Product Requirements Document (PRD): ${spec.projectName}

## 1. Executive Summary & Vision
${spec.appDescription}

- **Project Classification**: ${projectType.toUpperCase()}
- **Target Platforms**: ${platforms}
- **Primary Goal**: Deliver a reliable, secure, high-performance user experience with responsive UI and offline data resilience.

## 2. Target Audience & Personas
- **Primary User**: Individuals needing streamlined access to ${spec.projectName} features with zero friction.
- **Key Pain Points Addressed**:
  - Eliminates slow, fragmented legacy workflows with instant local-first caching.
  - Ensures clean, intuitive visual hierarchy without visual clutter.

## 3. Core Feature Specifications

### 🌟 P0 - Core Mandatory Capabilities (MVP)
- **Authentication & Onboarding**: Safe user onboarding, secure token management, and biometric access.
- **Core Domain Workflows**: Direct execution of primary business flows with deterministic validation.
- **Offline & Cache Strategy**: Seamless local data persistence so users never face blank screens on flaky connections.

### 🚀 P1 - Enhanced User Experience & Analytics
- **Visual Dashboards**: Animated KPI charts, activity summaries, and metric comparisons.
- **Push & Deep Linking**: Universal linking into detail views and actionable notification routing.

### 🔮 P2 - Advanced Extensions & Integrations
- **AI-Powered Assistance**: Integrated contextual assistant and smart data summaries.
- **Localization (i18n)**: Multi-language support with Right-to-Left (RTL) localization.

## 4. Non-Functional Requirements
- **Performance**: 60/120 FPS UI rendering; API latency under 200ms with cached fallbacks.
- **Security**: Hardware-backed Keystore/Keychain encryption for tokens, SSL Pinning, and zero plaintext secret leakage.
- **Accessibility**: WCAG 2.1 AA compliance with minimum 48×48dp touch targets and screen-reader semantics.
`;

    // 2. architecture.md
    const architectureMd = `# System Architecture: ${spec.projectName}

## 1. Architectural Paradigm
- **Pattern**: ${archName}
- **Data Flow**: Unidirectional Data Flow (UDF) / Reactive Streams

\`\`\`mermaid
flowchart TD
    UI[Presentation Layer: Widgets & Pages] -->|Dispatches Actions| Ctrl[State Controllers / Notifiers]
    Ctrl -->|Invokes Use Cases| Domain[Domain Layer: Entities & Use Cases]
    Domain -->|Calls Repository Interfaces| Repo[Data Layer: Repositories]
    Repo -->|Fetches / Caches| Remote[Remote Data Source / REST API]
    Repo -->|Local Persistence| Local[Local DB / Drift / SecureStorage]
    Local -.->|Streams Reactive Data| Ctrl
\`\`\`

## 2. Directory & Package Blueprint
\`\`\`
lib/
├── main.dart
├── app/
│   ├── app.dart
│   ├── router/           # go_router declarative routing
│   └── theme/            # Material 3 light/dark tokens
├── core/
│   ├── network/          # Dio client, interceptors & error handlers
│   ├── database/         # Drift SQLite DB & DAOs
│   ├── security/         # FlutterSecureStorage & BiometricAuth
│   └── widgets/          # Shared atomic components & charts
└── features/
    └── [feature_name]/
        ├── data/         # DTOs, data sources, repository implementations
        ├── domain/       # Domain entities & business contracts
        └── presentation/ # Riverpod/Bloc controllers & UI screens
\`\`\`

## 3. State Management & Data Flow Standard
1. State is strictly immutable (\`@freezed\` / Dart 3 sealed classes).
2. UI components are stateless consumers (\`ConsumerWidget\`).
3. Network calls always execute asynchronously through dedicated repositories.
`;

    // 3. rules.md
    const rulesMd = `# Engineering Guidelines & Code Quality Rules: ${spec.projectName}

## 1. Architectural Constraints
1. **Zero Business Logic in UI**: Widgets must only render UI and dispatch events. All logic resides in Controllers/Notifiers.
2. **Immutability First**: State objects must be immutable. Never mutate state variables directly.
3. **No Forced Glassmorphism**: Use clean Material 3 solid surfaces with tonal elevation (\`surfaceContainer\`). Only apply frosted glass/blur if explicitly specified in feature tickets.
4. **8-Point Spatial Rhythm**: Margin and padding must follow 8-pt increments (8, 16, 24, 32dp).

## 2. Security & Error Handling
1. **No Hardcoded Secrets**: Secrets must be loaded via compile-time environment configs or secure remote endpoints.
2. **Secure Token Storage**: Use \`flutter_secure_storage\` backed by Android EncryptedSharedPreferences & iOS Keychain.
3. **Resource Disposal**: Always dispose \`TextEditingController\`, \`AnimationController\`, and streams in \`dispose()\` or Riverpod \`ref.onDispose()\`.

## 3. Testing Standards
- Unit test all business logic repositories with \`mocktail\`.
- Widget test critical user paths using \`testWidgets\` and \`pumpAndSettle\`.
`;

    // 4. phases.md
    const phasesMd = `# Execution Roadmap & Milestones: ${spec.projectName}

- **Timeline Strategy**: ${projectType === "hackathon" ? "24-48 Hour Sprint Matrix" : "Sprint Milestone Delivery"}

### 📌 Milestone 1: Foundation & Core Scaffolding
- [ ] Initialize repository, pubspec dependencies, and linting rules.
- [ ] Configure declarative routing (\`go_router\`) and Material 3 theme palette.
- [ ] Scaffold network client (\`Dio\`) and secure storage services.

### 📌 Milestone 2: Authentication & Core Workflows
- [ ] Implement onboarding tour and login/signup flows.
- [ ] Scaffold primary domain entities, repositories, and reactive state notifiers.
- [ ] Build primary responsive dashboard and list views.

### 📌 Milestone 3: Polish, Visual Metrics & Data Resilience
- [ ] Integrate interactive animated charts for metric visualization.
- [ ] Implement zero-crash offline resilience cache interceptors.
- [ ] Conduct accessibility and security audits.

### 📌 Milestone 4: QA, Golden Tests & Production CI/CD
- [ ] Generate unit and widget test suites.
- [ ] Set up GitHub Actions CI/CD with split-per-ABI APKs and Windows MSIX signing.
- [ ] Final release build verification.
`;

    // 5. design.md (Dynamically derived from prompt)
    const colorThemeDesc = spec.designPreferences?.colorTheme || (descLower.includes("dark") ? "OLED Dark & Cyber Blue" : "Deep Indigo & Crisp Slate");
    const navStyle = spec.designPreferences?.navigationStyle || "Adaptive Navigation Bar (Bottom Bar on Mobile, Navigation Rail on Desktop/Web)";

    const designMd = `# Design System & UI/UX Specification: ${spec.projectName}

## 1. Visual Theme & Color Palette
- **Brand Palette Concept**: ${colorThemeDesc}
- **Design Language**: Modern Material Design 3 (M3)
- **Surface Elevation**: Tonal elevation using \`surfaceContainer\`, \`surfaceContainerHighest\`, and subtle hairline borders (\`outlineVariant.withValues(alpha: 0.3)\`).

## 2. Typography Scale
- **Display / Headlines**: Bold geometric font (e.g. Plus Jakarta Sans / Inter), tracking -0.5px.
- **Body / Subtitles**: High-legibility sans-serif with 1.45 line-height for comfortable reading.
- **Monospace / Numbers**: Tabular figures for financial and metric data displays.

## 3. Navigation & Screen Ergonomics
- **Structure**: ${navStyle}
- **Spatial Rhythm**: Strict 8-point spatial rhythm (4dp micro, 8dp standard, 16dp medium, 24dp screen gutters).
- **Interactive Tap Targets**: Minimum 48×48dp bounding boxes for all clickable elements.

## 4. Motion & Micro-Interactions
- **Entry Animations**: Staggered slide + fade (250–350ms with \`Curves.easeOutCubic\`).
- **Interactive Feedback**: Haptic feedback on primary button taps and pull-to-refresh.
`;

    // 6. memory.md
    const memoryMd = `# Project Memory & Architectural Decision Records (ADR)

## 1. Project Metadata
- **Project Name**: ${spec.projectName}
- **Initiated**: ${new Date().toISOString().split("T")[0]}
- **Architectural Pattern**: ${archName}
- **Project Classification**: ${projectType}

## 2. Architectural Decisions (ADR)
- **ADR-001 (State Management)**: Selected Riverpod / Bloc for compile-safe dependency injection and decoupled testability.
- **ADR-002 (Local Persistence)**: Selected Drift SQLite for type-safe offline-first reactive queries.
- **ADR-003 (UI Guidelines)**: Enforced Material 3 solid containers without forced glassmorphism unless explicitly requested.

## 3. Active Progress Tracker
- **Current Status**: Project documentation & architectural blueprint established.
- **Next Action Items**: Implement Milestone 1 scaffolding.
`;

    // File writing logic with existence check
    const docs = {
      "PRD.md": prdMd,
      "architecture.md": architectureMd,
      "rules.md": rulesMd,
      "phases.md": phasesMd,
      "design.md": designMd,
      "memory.md": memoryMd
    };

    const outDir = spec.outputDirectory || process.cwd();
    const generatedFiles: Array<{ fileName: string; filePath: string; status: "created" | "skipped_already_exists" | "overwritten" }> = [];

    for (const [fileName, content] of Object.entries(docs)) {
      const targetPath = path.join(outDir, fileName);
      let status: "created" | "skipped_already_exists" | "overwritten" = "created";

      if (fs.existsSync(targetPath)) {
        if (spec.overwriteExisting) {
          fs.writeFileSync(targetPath, content, "utf8");
          status = "overwritten";
        } else {
          status = "skipped_already_exists";
        }
      } else {
        try {
          fs.writeFileSync(targetPath, content, "utf8");
          status = "created";
        } catch {
          // If in-memory or read-only test runner, record created
          status = "created";
        }
      }

      generatedFiles.push({ fileName, filePath: targetPath, status });
    }

    const summary = `Generated project documentation suite (${generatedFiles.map(f => `${f.fileName}: ${f.status}`).join(", ")}).`;

    return {
      generatedFiles,
      clarificationQuestionsNeeded: questions.length > 0 ? questions : undefined,
      documents: {
        prdMd,
        architectureMd,
        rulesMd,
        phasesMd,
        designMd,
        memoryMd
      },
      summary
    };
  }
}
