export interface IServerConfig {
  host: string;
  port: number;
  explicitError: boolean;
  staticFiles: string;
}
export interface IDataBaseConfig {
  user: string;
  password: string;
  cluster: string;
  connectionString: string;
}
