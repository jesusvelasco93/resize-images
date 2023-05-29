import Path from "Path";
import Inert from "@hapi/inert";
import Hapi from "@hapi/hapi";
import { AppConfig } from "./appConfig";

// Import from controllers
import { TaskController } from "./controllers/TaskController";
import { StaticFilesController } from "./controllers/StaticFilesController";

// Plugins
export const plugins = [{ plugin: Inert }];
// Additional headers for cors
const additionalHeaders = [];
// Get app config
const appConfig = new AppConfig();

// Create server
const server = new Hapi.Server({
  port: appConfig.server.port,
  host: appConfig.server.host,
  debug: {
    request: ["error"],
  },
  routes: {
    files: {
      relativeTo: Path.join(__dirname, "../output/"),
    },
    cors: {
      origin: ["*"],
      additionalHeaders,
      credentials: true,
    },
    security: {
      xss: "enabled",
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: false,
      },
      xframe: true,
      noOpen: false,
      noSniff: true,
      referrer: "no-referrer",
    },
    timeout: {
      server: 120000,
      socket: 125000,
    },
  },
});

export const routes = [...TaskController.routes, ...StaticFilesController.routes];

export default server;
