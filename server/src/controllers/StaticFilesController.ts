import * as joi from "joi";
import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import Validation from "../core/validation";

export class StaticFilesController {
  private static filenameValidation: joi.SchemaMap = {
    // Discard to allow use in swagger -> https://github.com/hapi-swagger/hapi-swagger/blob/master/usageguide.md#features-from-hapi-that-cannot-be-ported-to-swagger
    // filename: joi.string().regex(/^(.+\/)+.+\..{3,4}$/),
    originalName: joi.string().required(),
    size: joi.string().valid("original", "800", "1024").required(),
    filename: joi
      .string()
      .regex(/^[a-f0-9]{32}\..{3,4}$/)
      .required(),
  };
  private static payloadValidation: joi.SchemaMap = {
    file: joi.any(),
  };
  /* Routes */
  public static routes: ServerRoute<ReqRefDefaults>[] = [
    {
      method: "GET",
      path: "/static/{originalName}/{size}/{filename}",
      options: {
        tags: ["api", "static"],
        description: "Return static images",
        notes: "Returns the image by path after static. You can use: /{name image}/{original/800/1024}/{'md5 of image'.'extension'}",
        plugins: {
          "hapi-swagger": {
            responses: {
              200: { description: "File" },
              400: { description: "Joi Validation Error" },
              404: { description: "Resource not found" },
            },
          },
        },
        validate: {
          params: joi.object({ ...StaticFilesController.filenameValidation }),
          failAction: Validation.explicitResponse,
        },
      },
      handler: (req, res) => {
        return res.file(`${req.params.originalName}/${req.params.size}/${req.params.filename}`);
      },
    },
  ];
}
