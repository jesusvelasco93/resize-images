import Axios, { AxiosInstance } from "axios";
import { AppConfig } from "../core/appConfig";

// Generic HTTP instance for all request
export function http(): AxiosInstance {
  const appConfig = new AppConfig();
  const options: any = {
    baseURL: appConfig.azure.url,
    headers: {},
  };
  return Axios.create(options);
}
