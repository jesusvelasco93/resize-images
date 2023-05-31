import server, { plugins, routes } from "./server";
import ErrorHandler from "./core/errorHandler";
import RequestHandler from "./core/requestHandler";
import DataBase from "./core/database";
import * as schedule from "node-schedule";
import { ScheduleService } from "./services/ScheduleService";

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

/* Autoschedule */
schedule.scheduleJob("*/5 * * * *", async () => {
  void ScheduleService.postTaskImage();
});

/* Handle crash */
process.on("unhandledRejection", (err) => {
  console.error("UnhandledRejection: ", err);
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.error("UncaughtException: ", err);
  process.exit(1);
});
