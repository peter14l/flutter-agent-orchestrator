import { FlutterDocBlueprintSpecialistAgent } from "../agents/doc-blueprint-specialist.js";
const agent = new FlutterDocBlueprintSpecialistAgent();
export const scaffoldFlutterProjectDocsSchema = {
    name: "scaffold_flutter_project_docs",
    description: "Scaffolds dynamic PRD.md, architecture.md, rules.md, phases.md, design.md, and memory.md tailored to user prompts. Verifies existing files before writing to avoid overwriting existing documentation.",
    inputSchema: {
        type: "object",
        properties: {
            projectName: {
                type: "string",
                description: "Name of the project."
            },
            appDescription: {
                type: "string",
                description: "Detailed description of the application, features, and intended audience."
            },
            targetPlatforms: {
                type: "array",
                items: { type: "string" },
                description: "Target platforms (e.g. ['android', 'ios', 'web', 'windows', 'macos', 'linux'])."
            },
            projectType: {
                type: "string",
                enum: ["production", "enterprise", "hackathon", "mvp", "general"],
                description: "Scope and timeline format."
            },
            preferredArchitecture: {
                type: "string",
                description: "Specific architectural style (e.g. 'Clean Architecture with Riverpod', 'BLoC Feature-First', 'MVVM')."
            },
            designPreferences: {
                type: "object",
                properties: {
                    colorTheme: { type: "string" },
                    typography: { type: "string" },
                    navigationStyle: { type: "string" },
                    darkMode: { type: "boolean" }
                },
                description: "Visual design preferences (theme, palette, navigation)."
            },
            outputDirectory: {
                type: "string",
                description: "Directory where markdown blueprint files will be written. Defaults to current working directory."
            },
            overwriteExisting: {
                type: "boolean",
                description: "Whether to overwrite existing files if already present. Defaults to false.",
                default: false
            }
        },
        required: ["projectName", "appDescription"]
    }
};
export async function handleScaffoldFlutterProjectDocs(args) {
    const spec = {
        projectName: args.projectName,
        appDescription: args.appDescription,
        targetPlatforms: args.targetPlatforms,
        projectType: args.projectType,
        preferredArchitecture: args.preferredArchitecture,
        designPreferences: args.designPreferences,
        outputDirectory: args.outputDirectory,
        overwriteExisting: args.overwriteExisting === true
    };
    const result = agent.scaffoldDocuments(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=doc-blueprint-tool.js.map