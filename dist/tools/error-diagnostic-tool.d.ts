export declare const diagnoseFlutterErrorSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            errorMessage: {
                type: string;
                description: string;
            };
            stackTrace: {
                type: string;
                description: string;
            };
            codeSnippet: {
                type: string;
                description: string;
            };
            flutterDoctorOutput: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare function handleDiagnoseFlutterError(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=error-diagnostic-tool.d.ts.map