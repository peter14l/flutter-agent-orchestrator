import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterDatabaseSpec {
    databaseName: string;
    tables: Array<{
        name: string;
        columns: Record<string, "text" | "integer" | "real" | "boolean" | "datetime">;
        primaryKey?: string;
    }>;
    schemaVersion?: number;
}
export interface FlutterDatabaseResult {
    driftDatabaseCode: string;
    daoCode: string;
    migrationCode: string;
    pubspecDependencies: Record<string, string>;
    summary: string;
}
export declare class FlutterDatabaseSpecialistAgent extends BaseFlutterAgent {
    constructor();
    scaffoldDatabase(spec: FlutterDatabaseSpec): FlutterDatabaseResult;
}
//# sourceMappingURL=database-specialist.d.ts.map