import { FlutterTestingSpecialistAgent } from "../agents/testing-specialist.js";
const agent = new FlutterTestingSpecialistAgent();
export const generateFlutterTestsSchema = {
    name: "generate_and_run_flutter_tests",
    description: "Generates Flutter Unit tests, Widget tests with testWidgets, and Riverpod/Bloc state tests, along with test execution commands.",
    inputSchema: {
        type: "object",
        properties: {
            className: {
                type: "string",
                description: "Name of the Screen, Widget, or Controller to test (e.g. 'DashboardScreen', 'AuthController')."
            },
            testType: {
                type: "string",
                enum: ["unit", "widget", "golden", "integration"],
                description: "Type of test to generate.",
                default: "widget"
            },
            stateManagement: {
                type: "string",
                enum: ["riverpod", "bloc", "provider", "signals"],
                description: "State management system.",
                default: "riverpod"
            },
            methodsOrWidgetsToTest: {
                type: "array",
                items: { type: "string" },
                description: "List of methods or user interactions to test."
            }
        },
        required: ["className"]
    }
};
export async function handleGenerateFlutterTests(args) {
    const spec = {
        className: args.className,
        testType: args.testType || "widget",
        stateManagement: args.stateManagement || "riverpod",
        methodsOrWidgetsToTest: args.methodsOrWidgetsToTest || ["render", "interaction"]
    };
    const result = agent.generateTest(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=test-generator-tool.js.map