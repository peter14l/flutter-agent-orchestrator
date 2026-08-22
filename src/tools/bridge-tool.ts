import { FlutterBridgeSpecialistAgent, FlutterBridgeSpec } from "../agents/bridge-specialist.js";

const agent = new FlutterBridgeSpecialistAgent();

export const generateFlutterApiBridgeSchema = {
  name: "generate_flutter_api_bridge",
  description: "Generates full-stack Flutter API client contracts: Dio REST client, JSON DTOs, Riverpod providers, and WebSocket realtime subscription providers.",
  inputSchema: {
    type: "object",
    properties: {
      serviceName: {
        type: "string",
        description: "Name of the API service (e.g. 'Order', 'Product', 'User')."
      },
      baseUrl: {
        type: "string",
        description: "Base API URL.",
        default: "https://api.example.com"
      },
      endpoints: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            method: { type: "string", enum: ["GET", "POST", "PUT", "DELETE"] },
            path: { type: "string" },
            requestType: { type: "string" },
            responseType: { type: "string" }
          },
          required: ["name", "method", "path", "responseType"]
        }
      },
      models: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            fields: { type: "object", additionalProperties: { type: "string" } }
          },
          required: ["name", "fields"]
        }
      }
    },
    required: ["serviceName"]
  }
};

export async function handleGenerateFlutterApiBridge(args: any) {
  const spec: FlutterBridgeSpec = {
    serviceName: args.serviceName,
    baseUrl: args.baseUrl,
    endpoints: args.endpoints || [
      { name: "fetchItems", method: "GET", path: "/", responseType: `List<${args.serviceName}Dto>` },
      { name: "createItem", method: "POST", path: "/", requestType: `${args.serviceName}Dto`, responseType: `${args.serviceName}Dto` }
    ],
    models: args.models || [
      {
        name: `${args.serviceName}Dto`,
        fields: { id: "String", title: "String" }
      }
    ]
  };

  const result = agent.generateBridge(spec);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
