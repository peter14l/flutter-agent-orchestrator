import { FlutterDeepLinkSpecialistAgent } from "../agents/deeplink-specialist.js";
const agent = new FlutterDeepLinkSpecialistAgent();
export const configureFlutterDeepLinksSchema = {
    name: "configure_flutter_deep_links",
    description: "Configures go_router deep linking, Android App Links (assetlinks.json), iOS Universal Links (apple-app-site-association), and FCM push notification routing.",
    inputSchema: {
        type: "object",
        properties: {
            customScheme: {
                type: "string",
                description: "Custom URL scheme (e.g. 'myapp').",
                default: "myapp"
            },
            domainHost: {
                type: "string",
                description: "Domain host for Universal Links (e.g. 'app.example.com').",
                default: "app.example.com"
            },
            routes: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        path: { type: "string" },
                        screenName: { type: "string" },
                        parameters: { type: "array", items: { type: "string" } }
                    },
                    required: ["path", "screenName"]
                }
            }
        },
        required: ["customScheme", "domainHost"]
    }
};
export async function handleConfigureFlutterDeepLinks(args) {
    const spec = {
        customScheme: args.customScheme || "myapp",
        domainHost: args.domainHost || "app.example.com",
        routes: args.routes || [
            { path: "/product/:id", screenName: "ProductDetailScreen", parameters: ["id"] },
            { path: "/profile", screenName: "ProfileScreen" },
            { path: "/settings", screenName: "SettingsScreen" }
        ]
    };
    const result = agent.configureRouting(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=deeplink-tool.js.map