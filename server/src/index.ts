import server, { plugins, routes } from "./server";

(async function start() {
  /* Add plugins */
  await server.register(plugins);
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
