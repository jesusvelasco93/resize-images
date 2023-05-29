import { Request, ReqRefDefaults, ResponseToolkit } from "@hapi/hapi";

export class TaskService {
  public static getTaskById(request: Request<ReqRefDefaults>, response: ResponseToolkit<ReqRefDefaults>) {
    return `ID: ${request.params.id}`;
  }
  public static postTask(request: Request<ReqRefDefaults>, response: ResponseToolkit<ReqRefDefaults>) {
    return `NOT DEV`;
  }
}
