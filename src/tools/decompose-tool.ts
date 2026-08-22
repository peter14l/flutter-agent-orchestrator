import { FlutterPromptDecomposerAgent } from "../agents/prompt-decomposer.js";
import { FlutterPlatform, FlutterStateManagement, FlutterArchitecture } from "../types.js";

const agent = new FlutterPromptDecomposerAgent();

export const decomposeFlutterPromptSchema = {
  name: "decompose_flutter_prompt",
  description: "Deconstructs Flutter prompts into Clean Architecture features, modules, and sprint plans. Always checks and verifies target platforms (iOS, Android, Web, Desktop) first.",
  inputSchema: {
    type: "object",
    properties: {
      prompt: {
        type: "string",
        description: "The raw user prompt or feature specification to break down."
      },
      targetPlatforms: {
        type: "array",
        items: {
          type: "string",
          enum: ["android", "ios", "web", "macos", "windows", "linux"]
        },
        description: "Target platforms for the Flutter app. If not provided or mentioned in prompt, a clarification prompt is returned."
      },
      projectName: {
        type: "string",
        description: "Project name (e.g. 'fitness_tracker').",
        default: "flutter_app"
      },
      stateManagement: {
        type: "string",
        enum: ["riverpod", "bloc", "provider", "signals"],
        description: "State management solution.",
        default: "riverpod"
      },
      architecturePattern: {
        type: "string",
        enum: ["feature-first-clean-architecture", "layer-first-clean-architecture", "mvc"],
        description: "Architectural structure.",
        default: "feature-first-clean-architecture"
      }
    },
    required: ["prompt"]
  }
};

export async function handleDecomposeFlutterPrompt(args: any) {
  const prompt = args.prompt as string;
  const targetPlatforms = args.targetPlatforms as FlutterPlatform[] | undefined;
  const projectName = (args.projectName as string) || "flutter_app";
  const stateManagement = (args.stateManagement as FlutterStateManagement) || "riverpod";
  const architecturePattern = (args.architecturePattern as FlutterArchitecture) || "feature-first-clean-architecture";

  const result = agent.decompose(prompt, targetPlatforms, projectName, stateManagement, architecturePattern);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
