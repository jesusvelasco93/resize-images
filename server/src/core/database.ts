import { connect } from "mongoose";
import { AppConfig } from "./appConfig";
import Logger from "./logger";

const DataBase = {
  connect: async () => {
    const appConfig = new AppConfig();
    // Uri format
    let uri = appConfig.dbConfig.connectionString;
    uri = uri.replace("{{user}}", appConfig.dbConfig.user);
    uri = uri.replace("{{password}}", appConfig.dbConfig.password);
    uri = uri.replace("{{cluster}}", appConfig.dbConfig.cluster);
    // Connect
    const result = await connect(uri).catch((err) => {
      console.log(err);
      Logger.error("Database", err?.message);
    });
    if (result) Logger.debug("DataBase", "Connection to database establish!");
    return result;
  },
};

export default DataBase;
