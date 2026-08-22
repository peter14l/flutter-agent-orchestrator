import { FlutterGoldenTestSpecialistAgent, FlutterGoldenTestSpec } from "../agents/golden-test-specialist.js";

const agent = new FlutterGoldenTestSpecialistAgent();

export const generateFlutterGoldenTestsSchema = {
  name: "generate_flutter_golden_tests",
  description: "Generates multi-device golden snapshot test suites for Flutter widgets across Light/Dark modes, phone, and tablet viewports.",
  inputSchema: {
    type: "object",
    properties: {
      screenName: {
        type: "string",
        description: "Name of the screen widget class (e.g. 'DashboardScreen')."
      },
      widgetName: {
        type: "string",
        description: "Name of the widget to snapshot.",
        default: "Screen"
      },
      testThemes: {
        type: "array",
        items: { type: "string", enum: ["light", "dark"] },
        default: ["light", "dark"]
      }
    },
    required: ["screenName"]
  }
};

export async function handleGenerateFlutterGoldenTests(args: any) {
  const spec: FlutterGoldenTestSpec = {
    screenName: args.screenName,
    widgetName: args.widgetName || args.screenName,
    testThemes: args.testThemes || ["light", "dark"]
  };

  const result = agent.generateGoldenTests(spec);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
