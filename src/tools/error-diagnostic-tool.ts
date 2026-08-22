import { FlutterErrorDiagnosticianAgent } from "../agents/error-diagnostician.js";
import { FlutterErrorDiagnosticInput } from "../types.js";

const agent = new FlutterErrorDiagnosticianAgent();

export const diagnoseFlutterErrorSchema = {
  name: "diagnose_flutter_errors",
  description: "Diagnoses Flutter errors including RenderFlex overflows, setState during build, pubspec version conflicts, CocoaPods build errors, and Gradle namespace mismatches.",
  inputSchema: {
    type: "object",
    properties: {
      errorMessage: {
        type: "string",
        description: "The error message or crash log."
      },
      stackTrace: {
        type: "string",
        description: "Optional stack trace."
      },
      codeSnippet: {
        type: "string",
        description: "The offending Flutter widget / Dart code."
      },
      flutterDoctorOutput: {
        type: "string",
        description: "Optional flutter doctor output."
      }
    },
    required: ["errorMessage"]
  }
};

export async function handleDiagnoseFlutterError(args: any) {
  const input: FlutterErrorDiagnosticInput = {
    errorMessage: args.errorMessage,
    stackTrace: args.stackTrace,
    codeSnippet: args.codeSnippet,
    flutterDoctorOutput: args.flutterDoctorOutput
  };

  const result = agent.diagnose(input);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
