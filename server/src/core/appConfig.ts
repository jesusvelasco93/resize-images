import config from "config";
import { IDataBaseConfig, IServerConfig } from "../interfaces/AppInterfaces";

export class AppConfig {
  public get server(): IServerConfig {
    return config.get("server");
  }
  public get dbConfig(): IDataBaseConfig {
    return config.get("dbConfig");
  }
}
