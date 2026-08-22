import { FlutterAuthFlowSpecialistAgent, FlutterAuthFlowSpec } from "../agents/auth-flow-specialist.js";

const agent = new FlutterAuthFlowSpecialistAgent();

export const scaffoldFlutterAuthFlowSchema = {
  name: "scaffold_flutter_auth_flow",
  description: "Scaffolds an instant animated Onboarding carousel (PageView with dots), Material 3 Social login UI (Google/Apple/Email), and token-persisting Riverpod Auth controllers.",
  inputSchema: {
    type: "object",
    properties: {
      appName: {
        type: "string",
        description: "Application name."
      },
      enableSocialLogins: {
        type: "boolean",
        default: true
      },
      enableOnboardingCarousel: {
        type: "boolean",
        default: true
      }
    },
    required: ["appName"]
  }
};

export async function handleScaffoldFlutterAuthFlow(args: any) {
  const spec: FlutterAuthFlowSpec = {
    appName: args.appName,
    enableSocialLogins: args.enableSocialLogins !== false,
    enableOnboardingCarousel: args.enableOnboardingCarousel !== false
  };

  const result = agent.scaffoldAuthFlow(spec);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
