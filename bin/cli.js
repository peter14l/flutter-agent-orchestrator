#!/usr/bin/env node

import { runServer } from "../dist/index.js";

runServer().catch((error) => {
  console.error("Fatal error starting Flutter Agent Orchestrator MCP:", error);
  process.exit(1);
});
