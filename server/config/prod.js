module.exports = {
  environment: "production",
  server: {
    host: process.env.URL_HOST,
    port: process.env.URL_PORT,
    explicitError: process.env.SERVER_EXPLICITERROR || false,
    staticFiles: process.env.SERVER_STATICFILES || "../output/",
  },
  dbConfig: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    cluster: process.env.DB_CLUSTER,
    connectionString: "mongodb+srv://{{user}}:{{password}}}@{{cluster}}/?retryWrites=true&w=majority",
  },
  azure: {
    url: process.env.AZURE_URL,
  },
};
