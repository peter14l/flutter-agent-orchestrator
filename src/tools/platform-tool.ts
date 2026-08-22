import { FlutterPlatformSpecialistAgent, FlutterPlatformConfigSpec } from "../agents/platform-specialist.js";
import { FlutterPlatform } from "../types.js";

const agent = new FlutterPlatformSpecialistAgent();

export const generateFlutterPlatformConfigSchema = {
  name: "generate_flutter_platform_config",
  description: "Generates native platform configurations: iOS Info.plist permission strings, AndroidManifest.xml permissions, and Web WASM CanvasKit bootstrap.",
  inputSchema: {
    type: "object",
    properties: {
      projectName: {
        type: "string",
        description: "Application name."
      },
      targetPlatforms: {
        type: "array",
        items: {
          type: "string",
          enum: ["android", "ios", "web", "macos", "windows", "linux"]
        },
        default: ["android", "ios"]
      },
      permissions: {
        type: "array",
        items: {
          type: "string",
          enum: ["camera", "location", "photos", "notifications", "microphone", "bluetooth"]
        },
        default: ["camera", "location"]
      }
    },
    required: ["projectName"]
  }
};

export async function handleGenerateFlutterPlatformConfig(args: any) {
  const spec: FlutterPlatformConfigSpec = {
    projectName: args.projectName,
    targetPlatforms: (args.targetPlatforms as FlutterPlatform[]) || ["android", "ios"],
    permissions: args.permissions || ["camera", "location"]
  };

  const result = agent.generateConfig(spec);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
