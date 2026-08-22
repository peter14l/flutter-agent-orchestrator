import { BaseFlutterAgent } from "./base-agent.js";
export interface FlutterBridgeSpec {
    serviceName: string;
    baseUrl?: string;
    endpoints: Array<{
        name: string;
        method: "GET" | "POST" | "PUT" | "DELETE";
        path: string;
        requestType?: string;
        responseType: string;
    }>;
    models: Array<{
        name: string;
        fields: Record<string, string>;
    }>;
}
export interface FlutterBridgeResult {
    serviceName: string;
    dioClientCode: string;
    dartModelsCode: string;
    riverpodProvidersCode: string;
    webSocketStreamCode: string;
    summary: string;
}
export declare class FlutterBridgeSpecialistAgent extends BaseFlutterAgent {
    constructor();
    generateBridge(spec: FlutterBridgeSpec): FlutterBridgeResult;
}
//# sourceMappingURL=bridge-specialist.d.ts.map