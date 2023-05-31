import config from "config";
import { IDataBaseConfig, IServerConfig, IAzureConfig } from "../interfaces/AppInterfaces";

export class AppConfig {
  public get server(): IServerConfig {
    return config.get("server");
  }
  public get dbConfig(): IDataBaseConfig {
    return config.get("dbConfig");
  }
  public get azure(): IAzureConfig {
    return config.get("azure");
  }
}
