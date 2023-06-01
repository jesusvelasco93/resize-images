module.exports = {
  environment: "local",
  server: {
    host: "localhost",
    port: 3000,
    explicitError: false,
    staticFiles: "../output/",
  },
  dbConfig: {
    user: "jesus-velasco",
    cluster: "resize-images.mlpu08t.mongodb.net",
    connectionString: "mongodb+srv://{{user}}:{{password}}@{{cluster}}/?retryWrites=true&w=majority",
  },
  azure: {
    url: "http://127.0.0.1:7071",
  },
};
