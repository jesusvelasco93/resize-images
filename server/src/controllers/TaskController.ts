import * as joi from "joi";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { TaskService } from "../services/TaskService";

export class TaskController {
  /* Validations */
  private static idValidation: joi.SchemaMap = {
    id: joi.string().uuid().required(),
  };
  private static payloadValidation: joi.SchemaMap = {};

  /* Routes */
  public static routes: ServerRoute<ReqRefDefaults>[] = [
    {
      method: "GET",
      path: "/api/task/{id}",
      options: {
        validate: {
          params: joi.object({ ...TaskController.idValidation }),
        },
      },
      handler: TaskService.getTaskById,
    },
    {
      method: "POST",
      path: "/api/task",
      options: {
        validate: {
          payload: joi.object({ ...TaskController.payloadValidation }),
        },
      },
      handler: TaskService.postTask,
    },
  ];
}
