import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError
} from "@modelcontextprotocol/sdk/types.js";

import { decomposeFlutterPromptSchema, handleDecomposeFlutterPrompt } from "./tools/decompose-tool.js";
import { researchFlutterDependenciesSchema, handleResearchFlutterDependencies } from "./tools/dependency-tool.js";
import { designFlutterUiSchema, handleDesignFlutterUi } from "./tools/ui-tool.js";
import { scaffoldFlutterBackendSchema, handleScaffoldFlutterBackend } from "./tools/backend-tool.js";
import { diagnoseFlutterErrorSchema, handleDiagnoseFlutterError } from "./tools/error-diagnostic-tool.js";
import { generateFlutterTestsSchema, handleGenerateFlutterTests } from "./tools/test-generator-tool.js";
import { orchestrateFlutterProjectSchema, handleOrchestrateFlutterProject } from "./tools/pipeline-orchestrator-tool.js";
import { auditFlutterCodeSchema, handleAuditFlutterCode } from "./tools/code-audit-tool.js";
import { generateFlutterApiBridgeSchema, handleGenerateFlutterApiBridge } from "./tools/bridge-tool.js";
import { generateFlutterPlatformConfigSchema, handleGenerateFlutterPlatformConfig } from "./tools/platform-tool.js";
import { generateFlutterCicdSchema, handleGenerateFlutterCicd } from "./tools/cicd-tool.js";
import { generateFlutterGoldenTestsSchema, handleGenerateFlutterGoldenTests } from "./tools/golden-test-tool.js";
import { scaffoldFlutterAiModuleSchema, handleScaffoldFlutterAiModule } from "./tools/ai-tool.js";
import { auditFlutterSecuritySchema, handleAuditFlutterSecurity } from "./tools/security-tool.js";
import { scaffoldFlutterDatabaseSchema, handleScaffoldFlutterDatabase } from "./tools/database-tool.js";
import { generateFlutterLocalizationSchema, handleGenerateFlutterLocalization } from "./tools/localization-tool.js";
import { scaffoldFlutterObservabilitySchema, handleScaffoldFlutterObservability } from "./tools/observability-tool.js";
import { configureFlutterDeepLinksSchema, handleConfigureFlutterDeepLinks } from "./tools/deeplink-tool.js";
import { auditFlutterAccessibilitySchema, handleAuditFlutterAccessibility } from "./tools/accessibility-tool.js";
import { generateFlutterMockFactorySchema, handleGenerateFlutterMockFactory } from "./tools/mock-factory-tool.js";
import { scaffoldFlutterAuthFlowSchema, handleScaffoldFlutterAuthFlow } from "./tools/auth-flow-tool.js";
import { generateFlutterChartsSchema, handleGenerateFlutterCharts } from "./tools/charts-tool.js";
import { scaffoldFlutterOfflineResilienceSchema, handleScaffoldFlutterOfflineResilience } from "./tools/offline-resilience-tool.js";
import { scaffoldFlutterProjectDocsSchema, handleScaffoldFlutterProjectDocs } from "./tools/doc-blueprint-tool.js";
import { FLUTTER_MCP_PROMPTS } from "./prompts/agent-prompts.js";
import { FLUTTER_MCP_RESOURCES } from "./resources/templates.js";

export function createFlutterMcpServer(): Server {
  const server = new Server(
    {
      name: "flutter-agent-orchestrator-mcp",
      version: "1.4.0"
    },
    {
      capabilities: {
        tools: {},
        prompts: {},
        resources: {}
      }
    }
  );

  // 1. Tools Registration (24 Specialized Tools)
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        decomposeFlutterPromptSchema,
        researchFlutterDependenciesSchema,
        designFlutterUiSchema,
        scaffoldFlutterBackendSchema,
        diagnoseFlutterErrorSchema,
        generateFlutterTestsSchema,
        orchestrateFlutterProjectSchema,
        auditFlutterCodeSchema,
        generateFlutterApiBridgeSchema,
        generateFlutterPlatformConfigSchema,
        generateFlutterCicdSchema,
        generateFlutterGoldenTestsSchema,
        scaffoldFlutterAiModuleSchema,
        auditFlutterSecuritySchema,
        scaffoldFlutterDatabaseSchema,
        generateFlutterLocalizationSchema,
        scaffoldFlutterObservabilitySchema,
        configureFlutterDeepLinksSchema,
        auditFlutterAccessibilitySchema,
        generateFlutterMockFactorySchema,
        scaffoldFlutterAuthFlowSchema,
        generateFlutterChartsSchema,
        scaffoldFlutterOfflineResilienceSchema,
        scaffoldFlutterProjectDocsSchema
      ]
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case "decompose_flutter_prompt":
          return await handleDecomposeFlutterPrompt(args || {});
        case "research_flutter_dependencies":
          return await handleResearchFlutterDependencies(args || {});
        case "design_flutter_ui":
          return await handleDesignFlutterUi(args || {});
        case "scaffold_flutter_backend":
          return await handleScaffoldFlutterBackend(args || {});
        case "diagnose_flutter_errors":
          return await handleDiagnoseFlutterError(args || {});
        case "generate_and_run_flutter_tests":
          return await handleGenerateFlutterTests(args || {});
        case "orchestrate_flutter_project":
          return await handleOrchestrateFlutterProject(args || {});
        case "audit_flutter_codebase":
          return await handleAuditFlutterCode(args || {});
        case "generate_flutter_api_bridge":
          return await handleGenerateFlutterApiBridge(args || {});
        case "generate_flutter_platform_config":
          return await handleGenerateFlutterPlatformConfig(args || {});
        case "generate_flutter_cicd_pipeline":
          return await handleGenerateFlutterCicd(args || {});
        case "generate_flutter_golden_tests":
          return await handleGenerateFlutterGoldenTests(args || {});
        case "scaffold_flutter_ai_module":
          return await handleScaffoldFlutterAiModule(args || {});
        case "audit_flutter_security":
          return await handleAuditFlutterSecurity(args || {});
        case "scaffold_flutter_database":
          return await handleScaffoldFlutterDatabase(args || {});
        case "generate_flutter_localization":
          return await handleGenerateFlutterLocalization(args || {});
        case "scaffold_flutter_observability":
          return await handleScaffoldFlutterObservability(args || {});
        case "configure_flutter_deep_links":
          return await handleConfigureFlutterDeepLinks(args || {});
        case "audit_flutter_accessibility":
          return await handleAuditFlutterAccessibility(args || {});
        case "generate_flutter_mock_factory":
          return await handleGenerateFlutterMockFactory(args || {});
        case "scaffold_flutter_auth_flow":
          return await handleScaffoldFlutterAuthFlow(args || {});
        case "generate_flutter_charts":
          return await handleGenerateFlutterCharts(args || {});
        case "scaffold_flutter_offline_resilience":
          return await handleScaffoldFlutterOfflineResilience(args || {});
        case "scaffold_flutter_project_docs":
          return await handleScaffoldFlutterProjectDocs(args || {});
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${name}`
          );
      }
    } catch (error: any) {
      if (error instanceof McpError) throw error;
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Tool execution failed: ${error.message || String(error)}`
          }
        ]
      };
    }
  });

  // 2. Prompts Registration
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: FLUTTER_MCP_PROMPTS.map(p => ({
        name: p.name,
        description: p.description,
        arguments: p.arguments
      }))
    };
  });

  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const promptDef = FLUTTER_MCP_PROMPTS.find(p => p.name === request.params.name);
    if (!promptDef) {
      throw new McpError(ErrorCode.InvalidParams, `Prompt not found: ${request.params.name}`);
    }

    const args = request.params.arguments || {};
    const text = promptDef.template(args);

    return {
      description: promptDef.description,
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text
          }
        }
      ]
    };
  });

  // 3. Resources Registration
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: FLUTTER_MCP_RESOURCES.map(r => ({
        uri: r.uri,
        name: r.name,
        mimeType: r.mimeType,
        description: r.description
      }))
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const resDef = FLUTTER_MCP_RESOURCES.find(r => r.uri === request.params.uri);
    if (!resDef) {
      throw new McpError(ErrorCode.InvalidParams, `Resource not found: ${request.params.uri}`);
    }

    return {
      contents: [
        {
          uri: resDef.uri,
          mimeType: resDef.mimeType,
          text: resDef.text
        }
      ]
    };
  });

  return server;
}

export async function runServer() {
  const server = createFlutterMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[flutter-agent-orchestrator] MCP Server running on stdio.");
}

if (process.argv[1] && import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  runServer().catch(err => {
    console.error("[flutter-agent-orchestrator] Fatal error:", err);
    process.exit(1);
  });
}
