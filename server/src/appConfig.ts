import { IServerConfig } from "./interfaces/AppInterfaces";

export class AppConfig {
  public get server(): IServerConfig {
    return {
      host: "localhost",
      port: 3000,
    };
  }
}
