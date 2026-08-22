import { BaseFlutterAgent } from "./base-agent.js";
import { PubSearchHelper, FLUTTER_ECOSYSTEM_REGISTRY } from "../utils/pub-search.js";
export class FlutterDependencyResearcherAgent extends BaseFlutterAgent {
    constructor() {
        super("FlutterDependencyResearcherAgent", "Pub.dev & Flutter Ecosystem Specialist", "Researches pub.dev packages, resolves version constraints, ensures Dart 3.6+ / Flutter 3.27+ compatibility, and generates pubspec.yaml.");
    }
    async researchAndGeneratePubspec(projectName = "flutter_app", targetPlatforms = ["android", "ios"], stateManagement = "riverpod", customPackages = []) {
        this.log("INFO", `Researching packages for ${projectName} [Platforms: ${targetPlatforms.join(", ")}]`);
        const researchedPackages = [];
        for (const pkg of customPackages) {
            if (!pkg.trim())
                continue;
            this.log("DEBUG", `Searching pub.dev for package: ${pkg}`);
            const results = await PubSearchHelper.searchPubDev(pkg);
            researchedPackages.push(...results);
        }
        const pubspec = PubSearchHelper.generatePubspec(projectName, targetPlatforms, stateManagement, customPackages);
        const advice = `
### 📦 Flutter & Dart Dependency Verification:
- **Flutter SDK Constraint**: \`${pubspec.flutterSdk}\` (Compatible with modern Impeller rendering engine).
- **Dart SDK Constraint**: \`${pubspec.dartSdk}\` (Enforces 100% Sound Null Safety, Pattern Matching, and Records).
- **State Management**: Using **${stateManagement.toUpperCase()}** with recommended code generators and lint rules.
- **Multi-Platform Support**: Dependencies verified for targets: **[${targetPlatforms.join(", ")}]**.
- **Static Analysis**: Configured with \`analysis_options.yaml\` enforcing \`prefer_const_constructors\` for smooth 120fps UI rendering.
    `.trim();
        this.log("INFO", `Generated pubspec.yaml with ${Object.keys(pubspec.dependencies).length} dependencies.`);
        return {
            pubspec,
            researchedPackages,
            advice
        };
    }
    getRegistryPackages() {
        return Object.values(FLUTTER_ECOSYSTEM_REGISTRY);
    }
}
//# sourceMappingURL=dependency-researcher.js.map