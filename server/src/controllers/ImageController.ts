import * as joi from "joi";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { maxBytes } from "../utils/constants";
import Validation from "../core/validation";
import { ImageService } from "../services/ImageService";
import { ScheduleService } from "../services/ScheduleService";

export class ImageController {
  /* Validations */
  private static idValidation: joi.SchemaMap = {
    id: joi
      .string()
      .regex(/^[a-f0-9]{32}$/)
      .required(),
  };
  private static payloadValidation: joi.SchemaMap = {
    files: joi.array().items(joi.any()),
  };

  /* Routes */
  public static routes: ServerRoute<ReqRefDefaults>[] = [
    {
      method: "POST",
      path: "/api/images",
      options: {
        tags: ["api", "image"],
        description: "Save resize image",
        notes: "Returns the id of the task of item that has been created",
        validate: {
          query: joi.object({ ...ImageController.idValidation }),
          payload: joi.object({ ...ImageController.payloadValidation }),
          failAction: Validation.explicitResponse,
        },
        payload: {
          maxBytes: maxBytes,
          output: "file",
          parse: true,
          multipart: { output: "annotated" },
        },
      },
      handler: ImageService.postImage,
    },
    {
      method: "PATCH",
      path: "/api/images",
      handler: ScheduleService.postTaskImage,
    },
  ];
}
