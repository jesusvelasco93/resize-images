import Path from "Path";
import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import { AppConfig } from "./core/appConfig";

// Import from controllers
import { TaskController } from "./controllers/TaskController";
import { StaticFilesController } from "./controllers/StaticFilesController";
import { ImageController } from "./controllers/ImageController";

// Get app config
const appConfig = new AppConfig();
// Additional headers for cors
const additionalHeaders = [];
const allowedDomains = ["*"]; // Use app config if you need different for each environment
// Swagger config
const swaggerConfig = {
  info: {
    title: "Resize Images API Documentation",
    version: "1.0.1",
  },
};

// Plugins
export const plugins = [{ plugin: Inert }, { plugin: Vision }, { plugin: HapiSwagger, options: swaggerConfig }];

// Create server
const server = new Hapi.Server({
  port: appConfig.server.port,
  host: appConfig.server.host,
  debug: {
    request: ["error"],
  },
  routes: {
    files: {
      relativeTo: Path.join(__dirname, appConfig.server.staticFiles),
    },
    cors: {
      origin: allowedDomains,
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

export const routes = [...TaskController.routes, ...ImageController.routes, ...StaticFilesController.routes];

export default server;
