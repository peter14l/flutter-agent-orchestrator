export declare const scaffoldFlutterDatabaseSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            databaseName: {
                type: string;
                description: string;
            };
            tables: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        name: {
                            type: string;
                        };
                        columns: {
                            type: string;
                            additionalProperties: {
                                type: string;
                                enum: string[];
                            };
                        };
                        primaryKey: {
                            type: string;
                        };
                    };
                    required: string[];
                };
                description: string;
            };
            schemaVersion: {
                type: string;
                description: string;
                default: number;
            };
        };
        required: string[];
    };
};
export declare function handleScaffoldFlutterDatabase(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=database-tool.d.ts.map