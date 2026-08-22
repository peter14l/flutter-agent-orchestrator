import { FlutterDatabaseSpecialistAgent, FlutterDatabaseSpec } from "../agents/database-specialist.js";

const agent = new FlutterDatabaseSpecialistAgent();

export const scaffoldFlutterDatabaseSchema = {
  name: "scaffold_flutter_database",
  description: "Scaffolds an offline-first type-safe Drift (SQLite) database with table schemas, DAOs with reactive streams, and schema version migration routines.",
  inputSchema: {
    type: "object",
    properties: {
      databaseName: {
        type: "string",
        description: "Name of the database (e.g. 'App', 'Expense', 'Commerce')."
      },
      tables: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            columns: { type: "object", additionalProperties: { type: "string", enum: ["text", "integer", "real", "boolean", "datetime"] } },
            primaryKey: { type: "string" }
          },
          required: ["name", "columns"]
        },
        description: "Database tables and column definitions."
      },
      schemaVersion: {
        type: "number",
        description: "Schema version number.",
        default: 1
      }
    },
    required: ["databaseName"]
  }
};

export async function handleScaffoldFlutterDatabase(args: any) {
  const spec: FlutterDatabaseSpec = {
    databaseName: args.databaseName,
    tables: args.tables || [
      {
        name: `${args.databaseName}Item`,
        columns: { id: "integer", title: "text", amount: "real", isCompleted: "boolean", createdAt: "datetime" },
        primaryKey: "id"
      }
    ],
    schemaVersion: args.schemaVersion || 1
  };

  const result = agent.scaffoldDatabase(spec);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
