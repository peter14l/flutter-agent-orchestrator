import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterMockFactorySpec {
    domainName: string;
    itemCount?: number;
    fields: Record<string, "name" | "email" | "price" | "date" | "status" | "avatar" | "title" | "uuid" | "boolean" | "number">;
}
export interface FlutterMockFactoryResult {
    factoryCode: string;
    mockRepositoryCode: string;
    summary: string;
}
export declare class FlutterMockFactorySpecialistAgent extends BaseFlutterAgent {
    constructor();
    generateFactory(spec: FlutterMockFactorySpec): FlutterMockFactoryResult;
}
//# sourceMappingURL=mock-factory-specialist.d.ts.map