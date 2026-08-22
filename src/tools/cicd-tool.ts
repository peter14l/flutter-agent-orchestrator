import { FlutterCicdSpecialistAgent, FlutterCicdSpec } from "../agents/cicd-specialist.js";
import { FlutterPlatform } from "../types.js";

const agent = new FlutterCicdSpecialistAgent();

export const generateFlutterCicdSchema = {
  name: "generate_flutter_cicd_pipeline",
  description: "Generates multi-platform GitHub Actions workflows for Flutter (Android AppBundle, iOS IPA, Web WASM), and Fastlane release lanes.",
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
        default: ["android", "ios"]
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

export async function handleGenerateFlutterCicd(args: any) {
  const spec: FlutterCicdSpec = {
    projectName: args.projectName,
    targetPlatforms: (args.targetPlatforms as FlutterPlatform[]) || ["android", "ios"],
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
