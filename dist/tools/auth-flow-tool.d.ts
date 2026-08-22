export declare const scaffoldFlutterAuthFlowSchema: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            appName: {
                type: string;
                description: string;
            };
            enableSocialLogins: {
                type: string;
                default: boolean;
            };
            enableOnboardingCarousel: {
                type: string;
                default: boolean;
            };
        };
        required: string[];
    };
};
export declare function handleScaffoldFlutterAuthFlow(args: any): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
//# sourceMappingURL=auth-flow-tool.d.ts.map