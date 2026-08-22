import { FlutterPlatform, PubPackageInfo, PubspecResult } from "../types.js";

export const FLUTTER_ECOSYSTEM_REGISTRY: Record<string, PubPackageInfo> = {
  // State Management
  "flutter_riverpod": { name: "flutter_riverpod", latestVersion: "^2.6.1", category: "state", description: "Reactive caching and data-binding framework for Flutter" },
  "riverpod_annotation": { name: "riverpod_annotation", latestVersion: "^2.6.1", category: "state", description: "Annotations for Riverpod code generator" },
  "riverpod_generator": { name: "riverpod_generator", latestVersion: "^2.6.3", category: "state", description: "Code generator for Riverpod 2.x", devDependency: true },
  "flutter_bloc": { name: "flutter_bloc", latestVersion: "^9.0.0", category: "state", description: "Predictable state management library" },
  "bloc": { name: "bloc", latestVersion: "^9.0.0", category: "state", description: "Core BLoC state management library" },

  // Networking & Serialization
  "dio": { name: "dio", latestVersion: "^5.8.0+1", category: "network", description: "Powerful HTTP client for Dart/Flutter" },
  "json_annotation": { name: "json_annotation", latestVersion: "^4.9.0", category: "utility", description: "Annotations for JSON serialization" },
  "json_serializable": { name: "json_serializable", latestVersion: "^6.9.4", category: "utility", description: "Code generator for JSON serialization", devDependency: true },
  "freezed": { name: "freezed", latestVersion: "^2.5.8", category: "utility", description: "Code generation for immutable classes and unions", devDependency: true },
  "freezed_annotation": { name: "freezed_annotation", latestVersion: "^2.4.4", category: "utility", description: "Annotations for Freezed code generator" },

  // Backend Integrations & Storage
  "supabase_flutter": { name: "supabase_flutter", latestVersion: "^2.8.4", category: "network", description: "Official Supabase client for Flutter" },
  "shared_preferences": { name: "shared_preferences", latestVersion: "^2.5.2", category: "storage", description: "Persistent key-value storage across all platforms" },
  "drift": { name: "drift", latestVersion: "^2.24.2", category: "storage", description: "Type-safe reactive SQL database for Flutter" },
  "drift_dev": { name: "drift_dev", latestVersion: "^2.24.2", category: "storage", description: "Dev generator for Drift SQL", devDependency: true },
  "hive_ce": { name: "hive_ce", latestVersion: "^1.8.6", category: "storage", description: "Fast, lightweight NoSQL database" },

  // Navigation & UI
  "go_router": { name: "go_router", latestVersion: "^14.8.0", category: "routing", description: "Declarative type-safe routing package" },
  "flutter_animate": { name: "flutter_animate", latestVersion: "^4.5.2", category: "ui", description: "Performant declarative animation library" },
  "google_fonts": { name: "google_fonts", latestVersion: "^6.2.1", category: "ui", description: "Google Fonts for Flutter" },
  "cached_network_image": { name: "cached_network_image", latestVersion: "^3.4.1", category: "ui", description: "Image loader with disk cache and placeholders" },
  "gap": { name: "gap", latestVersion: "^3.0.1", category: "ui", description: "Lightweight spacing widget for Flex widgets" },
  "flutter_svg": { name: "flutter_svg", latestVersion: "^2.0.17", category: "ui", description: "SVG rendering library" },

  // Tooling & Testing
  "build_runner": { name: "build_runner", latestVersion: "^2.4.15", category: "testing", description: "Build tool for code generators", devDependency: true },
  "flutter_lints": { name: "flutter_lints", latestVersion: "^5.0.0", category: "testing", description: "Recommended lints for Flutter", devDependency: true },
  "mocktail": { name: "mocktail", latestVersion: "^1.0.4", category: "testing", description: "Null-safe mocking library without code generation", devDependency: true }
};

export class PubSearchHelper {
  static async searchPubDev(query: string): Promise<PubPackageInfo[]> {
    try {
      const url = `https://pub.dev/api/search?q=${encodeURIComponent(query)}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        const json = (await res.json()) as any;
        const packages = json?.packages || [];
        return packages.slice(0, 5).map((p: any) => ({
          name: p.package,
          latestVersion: "^latest",
          category: "network",
          description: `Pub.dev package: ${p.package}`
        }));
      }
    } catch {
      // Fallback to local registry
    }

    const qLower = query.toLowerCase();
    return Object.values(FLUTTER_ECOSYSTEM_REGISTRY).filter(
      item => item.name.includes(qLower) || item.category.includes(qLower) || item.description.toLowerCase().includes(qLower)
    ).slice(0, 5);
  }

  static generatePubspec(
    projectName: string = "flutter_app",
    targetPlatforms: FlutterPlatform[] = ["android", "ios"],
    stateManagement: "riverpod" | "bloc" | "provider" | "signals" = "riverpod",
    extraPackages: string[] = []
  ): PubspecResult {
    const dependencies: Record<string, string> = {
      flutter: "sdk: flutter",
      go_router: "^14.8.0",
      flutter_animate: "^4.5.2",
      cached_network_image: "^3.4.1",
      gap: "^3.0.1",
      shared_preferences: "^2.5.2"
    };

    const devDependencies: Record<string, string> = {
      flutter_test: "sdk: flutter",
      flutter_lints: "^5.0.0",
      mocktail: "^1.0.4",
      build_runner: "^2.4.15"
    };

    if (stateManagement === "riverpod") {
      dependencies["flutter_riverpod"] = "^2.6.1";
      dependencies["riverpod_annotation"] = "^2.6.1";
      devDependencies["riverpod_generator"] = "^2.6.3";
      devDependencies["custom_lint"] = "^0.7.0";
      devDependencies["riverpod_lint"] = "^2.6.3";
    } else if (stateManagement === "bloc") {
      dependencies["flutter_bloc"] = "^9.0.0";
      dependencies["bloc"] = "^9.0.0";
    }

    for (const pkg of extraPackages) {
      if (pkg.includes("dio")) dependencies["dio"] = "^5.8.0+1";
      if (pkg.includes("supabase")) dependencies["supabase_flutter"] = "^2.8.4";
      if (pkg.includes("drift")) {
        dependencies["drift"] = "^2.24.2";
        devDependencies["drift_dev"] = "^2.24.2";
      }
      if (pkg.includes("freezed")) {
        dependencies["freezed_annotation"] = "^2.4.4";
        devDependencies["freezed"] = "^2.5.8";
      }
    }

    const pubspecLines: string[] = [
      `name: ${projectName.toLowerCase().replace(/[^a-z0-9_]/g, "_")}`,
      `description: "A production-grade Flutter application built with Clean Architecture."`,
      `publish_to: "none"`,
      `version: 1.0.0+1`,
      ``,
      `environment:`,
      `  sdk: ^3.6.0`,
      `  flutter: ">=3.27.0"`,
      ``,
      `dependencies:`
    ];

    for (const [k, v] of Object.entries(dependencies)) {
      if (v.startsWith("sdk:")) {
        pubspecLines.push(`  ${k}:`);
        pubspecLines.push(`    ${v}`);
      } else {
        pubspecLines.push(`  ${k}: ${v}`);
      }
    }

    pubspecLines.push(``, `dev_dependencies:`);
    for (const [k, v] of Object.entries(devDependencies)) {
      if (v.startsWith("sdk:")) {
        pubspecLines.push(`  ${k}:`);
        pubspecLines.push(`    ${v}`);
      } else {
        pubspecLines.push(`  ${k}: ${v}`);
      }
    }

    pubspecLines.push(
      ``,
      `flutter:`,
      `  uses-material-design: true`,
      `  assets:`,
      `    - assets/images/`,
      `    - assets/icons/`
    );

    const pubspecYaml = pubspecLines.join("\n");

    const analysisOptionsYaml = `include: package:flutter_lints/flutter.yaml

linter:
  rules:
    prefer_const_constructors: true
    prefer_const_declarations: true
    avoid_print: true
    unawaited_futures: true
    use_build_context_synchronously: true
    prefer_final_locals: true
`;

    return {
      projectName,
      description: "Flutter Application with Clean Architecture",
      flutterSdk: ">=3.27.0",
      dartSdk: "^3.6.0",
      targetPlatforms,
      dependencies,
      devDependencies,
      pubspecYaml,
      analysisOptionsYaml
    };
  }
}
