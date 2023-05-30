import * as joi from "joi";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { maxBytes } from "../utils/constants";
import Validation from "../core/validation";
import { TaskService } from "../services/TaskService";

export class TaskController {
  /* Validations */
  private static idValidation: joi.SchemaMap = {
    id: joi
      .string()
      .regex(/^[a-f0-9]{32}$/)
      .required(),
  };
  private static payloadValidation: joi.SchemaMap = {
    file: joi.any(),
  };

  /* Routes */
  public static routes: ServerRoute<ReqRefDefaults>[] = [
    {
      method: "GET",
      path: "/api/task/{id}",
      options: {
        tags: ["api", "task"],
        description: "Get status of the task",
        notes: "Returns the status of the task of item by the id passed in the path",
        validate: {
          params: joi.object({ ...TaskController.idValidation }),
          failAction: Validation.explicitResponse,
        },
      },
      handler: TaskService.getTaskById,
    },
    {
      method: "POST",
      path: "/api/task",
      options: {
        tags: ["api", "task"],
        description: "Create a new task to resize image",
        notes: "Returns the id of the task of item that has been created",
        validate: {
          payload: joi.object({ ...TaskController.payloadValidation }),
          failAction: Validation.explicitResponse,
        },
        payload: {
          maxBytes: maxBytes,
          output: "file",
          parse: true,
          multipart: { output: "annotated" },
        },
      },
      handler: TaskService.postTask,
    },
  ];
}
