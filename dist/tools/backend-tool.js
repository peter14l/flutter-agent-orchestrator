import { FlutterBackendSpecialistAgent } from "../agents/backend-specialist.js";
const agent = new FlutterBackendSpecialistAgent();
export const scaffoldFlutterBackendSchema = {
    name: "scaffold_flutter_backend",
    description: "Scaffolds Clean Architecture repositories, Dio/Supabase remote data sources, Drift/Hive local caching, and Riverpod/Bloc business controllers.",
    inputSchema: {
        type: "object",
        properties: {
            featureName: {
                type: "string",
                description: "Name of the feature or domain model (e.g. 'Order', 'Product', 'User')."
            },
            stateManagement: {
                type: "string",
                enum: ["riverpod", "bloc", "provider", "signals"],
                description: "State management system.",
                default: "riverpod"
            },
            backendProvider: {
                type: "string",
                enum: ["rest-dio", "supabase", "firebase", "graphql"],
                description: "Remote data source provider.",
                default: "rest-dio"
            },
            database: {
                type: "string",
                enum: ["drift", "hive_ce", "isar", "shared_preferences"],
                description: "Local persistence database.",
                default: "shared_preferences"
            }
        },
        required: ["featureName"]
    }
};
export async function handleScaffoldFlutterBackend(args) {
    const feature = args.featureName;
    const spec = {
        featureName: feature,
        stateManagement: args.stateManagement || "riverpod",
        backendProvider: args.backendProvider || "rest-dio",
        database: args.database || "shared_preferences",
        entities: [
            {
                name: `${feature.charAt(0).toUpperCase() + feature.slice(1)}Item`,
                fields: { id: "String", name: "String", description: "String", updatedAt: "DateTime" }
            }
        ]
    };
    const result = agent.scaffoldBackend(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=backend-tool.js.map