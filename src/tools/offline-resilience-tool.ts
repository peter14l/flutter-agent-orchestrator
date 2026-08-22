import { FlutterOfflineResilienceSpecialistAgent, FlutterOfflineResilienceSpec } from "../agents/offline-resilience-specialist.js";

const agent = new FlutterOfflineResilienceSpecialistAgent();

export const scaffoldFlutterOfflineResilienceSchema = {
  name: "scaffold_flutter_offline_resilience",
  description: "Scaffolds an automatic fallback interceptor that catches Wi-Fi drops / network failures and seamlessly serves cached/embedded mock data with zero crash during live stage demos.",
  inputSchema: {
    type: "object",
    properties: {
      enableDemoMockFallback: {
        type: "boolean",
        default: true
      },
      cacheDurationMinutes: {
        type: "number",
        default: 60
      }
    }
  }
};

export async function handleScaffoldFlutterOfflineResilience(args: any) {
  const spec: FlutterOfflineResilienceSpec = {
    enableDemoMockFallback: args.enableDemoMockFallback !== false,
    cacheDurationMinutes: args.cacheDurationMinutes || 60
  };

  const result = agent.scaffoldResilience(spec);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
