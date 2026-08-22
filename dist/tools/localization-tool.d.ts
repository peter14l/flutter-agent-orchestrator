export declare const generateFlutterLocalizationSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            defaultLocale: {
                type: string;
                default: string;
            };
            supportedLocales: {
                type: string;
                items: {
                    type: string;
                };
                default: string[];
            };
            stringKeys: {
                type: string;
                description: string;
                additionalProperties: {
                    type: string;
                    properties: {
                        en: {
                            type: string;
                        };
                        es: {
                            type: string;
                        };
                        ar: {
                            type: string;
                        };
                        description: {
                            type: string;
                        };
                    };
                    required: string[];
                };
            };
        };
    };
};
export declare function handleGenerateFlutterLocalization(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=localization-tool.d.ts.map