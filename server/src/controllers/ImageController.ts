import * as joi from "joi";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { maxBytes } from "../utils/constants";
import Validation from "../core/validation";
import { ImageService } from "../services/ImageService";

export class ImageController {
  /* Validations */
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
  ];
}
