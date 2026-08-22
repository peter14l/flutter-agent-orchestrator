import { FlutterLocalizationSpecialistAgent, FlutterLocalizationSpec } from "../agents/localization-specialist.js";

const agent = new FlutterLocalizationSpecialistAgent();

export const generateFlutterLocalizationSchema = {
  name: "generate_flutter_localization",
  description: "Generates l10n.yaml, standard ARB localization translation files (en, es, ar), dynamic locale switching notifier, and Right-to-Left (RTL) language handling.",
  inputSchema: {
    type: "object",
    properties: {
      defaultLocale: {
        type: "string",
        default: "en"
      },
      supportedLocales: {
        type: "array",
        items: { type: "string" },
        default: ["en", "es", "ar"]
      },
      stringKeys: {
        type: "object",
        description: "Map of localization keys to translations and descriptions.",
        additionalProperties: {
          type: "object",
          properties: {
            en: { type: "string" },
            es: { type: "string" },
            ar: { type: "string" },
            description: { type: "string" }
          },
          required: ["en"]
        }
      }
    }
  }
};

export async function handleGenerateFlutterLocalization(args: any) {
  const spec: FlutterLocalizationSpec = {
    defaultLocale: args.defaultLocale || "en",
    supportedLocales: args.supportedLocales || ["en", "es", "ar"],
    stringKeys: args.stringKeys || {
      appTitle: { en: "My Flutter Application", es: "Mi Aplicación Flutter", ar: "تطبيقي فلاتر", description: "Main app title" },
      welcomeMessage: { en: "Welcome back!", es: "¡Bienvenido de nuevo!", ar: "مرحبًا بعودتك!", description: "Greeting" },
      retryButton: { en: "Try Again", es: "Reintentar", ar: "إعادة المحاولة", description: "Action button" }
    }
  };

  const result = agent.generateLocalization(spec);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
