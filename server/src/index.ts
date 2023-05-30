import server, { plugins, routes } from "./server";
import ErrorHandler from "./core/errorHandler";
import RequestHandler from "./core/requestHandler";
import DataBase from "./core/database";

(async function start() {
  await DataBase.connect();
  /* Add plugins */
  await server.register(plugins);
  /* Interceptors */
  server.ext([{ type: "onRequest", method: [RequestHandler.globalRequestHandler] }]);
  server.ext([{ type: "onPreResponse", method: [ErrorHandler.globalErrorHandler] }]);
  /* Add routes */
  server.route(routes);
  /* Start server */
  await server.start();
  console.log("Server running on %s", server.info.uri);
})();

/* Handle crash */
process.on("unhandledRejection", (err) => {
  console.error("UnhandledRejection: ", err);
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.error("UncaughtException: ", err);
  process.exit(1);
});
