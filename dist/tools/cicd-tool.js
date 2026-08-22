import { FlutterCicdSpecialistAgent } from "../agents/cicd-specialist.js";
const agent = new FlutterCicdSpecialistAgent();
export const generateFlutterCicdSchema = {
    name: "generate_flutter_cicd_pipeline",
    description: "Generates production multi-platform GitHub Actions workflows for Flutter with Split-per-ABI signed APKs, automated 'gh secret set' keystore script, Windows MSIX packaging with self-signed test certificates, and Fastlane.",
    inputSchema: {
        type: "object",
        properties: {
            projectName: {
                type: "string",
                description: "Project name."
            },
            targetPlatforms: {
                type: "array",
                items: {
                    type: "string",
                    enum: ["android", "ios", "web", "macos", "windows", "linux"]
                },
                default: ["android", "windows", "ios"]
            },
            enableSplitPerAbiApk: {
                type: "boolean",
                description: "Build split per ABI release APKs (armeabi-v7a, arm64-v8a, x86_64).",
                default: true
            },
            enableWindowsMsix: {
                type: "boolean",
                description: "Build and sign Windows MSIX with a test certificate.",
                default: true
            },
            enableFastlane: {
                type: "boolean",
                description: "Generate Fastlane release lanes for TestFlight & Play Store.",
                default: true
            },
            enableWebDeploy: {
                type: "boolean",
                description: "Enable Flutter Web build step.",
                default: false
            }
        },
        required: ["projectName"]
    }
};
export async function handleGenerateFlutterCicd(args) {
    const spec = {
        projectName: args.projectName,
        targetPlatforms: args.targetPlatforms || ["android", "windows", "ios"],
        enableSplitPerAbiApk: args.enableSplitPerAbiApk !== false,
        enableWindowsMsix: args.enableWindowsMsix !== false,
        enableFastlane: args.enableFastlane !== false,
        enableWebDeploy: args.enableWebDeploy === true
    };
    const result = agent.generateCicd(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=cicd-tool.js.map