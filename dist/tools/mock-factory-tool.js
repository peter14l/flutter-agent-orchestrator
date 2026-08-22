import { FlutterMockFactorySpecialistAgent } from "../agents/mock-factory-specialist.js";
const agent = new FlutterMockFactorySpecialistAgent();
export const generateFlutterMockFactorySchema = {
    name: "generate_flutter_mock_factory",
    description: "Generates realistic domain mock data factories, fake entities, and in-memory mock repositories for instant hackathon UI prototyping.",
    inputSchema: {
        type: "object",
        properties: {
            domainName: {
                type: "string",
                description: "Name of the entity/domain (e.g. 'Product', 'Transaction', 'User', 'Task')."
            },
            itemCount: {
                type: "number",
                default: 10
            },
            fields: {
                type: "object",
                additionalProperties: {
                    type: "string",
                    enum: ["name", "email", "price", "date", "status", "avatar", "title", "uuid", "boolean", "number"]
                }
            }
        },
        required: ["domainName"]
    }
};
export async function handleGenerateFlutterMockFactory(args) {
    const spec = {
        domainName: args.domainName,
        itemCount: args.itemCount || 10,
        fields: args.fields || {
            id: "uuid",
            title: "title",
            price: "price",
            status: "status",
            avatar: "avatar",
            date: "date"
        }
    };
    const result = agent.generateFactory(spec);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ]
    };
}
//# sourceMappingURL=mock-factory-tool.js.map