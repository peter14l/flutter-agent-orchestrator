import { FlutterDependencyResearcherAgent } from "../agents/dependency-researcher.js";
import { FlutterPlatform, FlutterStateManagement } from "../types.js";

const agent = new FlutterDependencyResearcherAgent();

export const researchFlutterDependenciesSchema = {
  name: "research_flutter_dependencies",
  description: "Researches pub.dev packages, verifies Dart 3.6+ / Flutter 3.27+ compatibility, and generates a standard pubspec.yaml and analysis_options.yaml.",
  inputSchema: {
    type: "object",
    properties: {
      projectName: {
        type: "string",
        description: "Name of the Flutter project.",
        default: "flutter_app"
      },
      targetPlatforms: {
        type: "array",
        items: {
          type: "string",
          enum: ["android", "ios", "web", "macos", "windows", "linux"]
        },
        description: "Target platforms for the Flutter app.",
        default: ["android", "ios"]
      },
      stateManagement: {
        type: "string",
        enum: ["riverpod", "bloc", "provider", "signals"],
        description: "State management framework.",
        default: "riverpod"
      },
      packages: {
        type: "array",
        items: { type: "string" },
        description: "Specific packages or keywords to search on pub.dev (e.g. ['dio', 'supabase', 'drift'])."
      }
    },
    required: []
  }
};

export async function handleResearchFlutterDependencies(args: any) {
  const projectName = (args.projectName as string) || "flutter_app";
  const targetPlatforms = (args.targetPlatforms as FlutterPlatform[]) || ["android", "ios"];
  const stateManagement = (args.stateManagement as FlutterStateManagement) || "riverpod";
  const packages = (args.packages as string[]) || [];

  const result = await agent.researchAndGeneratePubspec(projectName, targetPlatforms, stateManagement, packages);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
