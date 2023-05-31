import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import parseMultipartFormData from "@anzp/azure-function-multipart";

import { FILE_PARAM } from "./constants";
import { IImage, IResizeResult } from "./interfaces";
import { resizeImagePromise, saveImages } from "./helper";

// NOTE: In place of call to the service to save the images, we should use Azure Blob Storage well configurated and save all in that place
// NOTE: This should to be a connector to the database (Most of them are premium or your should to migrate your DB to Cosmos DB)
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  // Prepare response
  let status = 200;
  let message = "Success";
  // Get from query params
  const _resolutions = req.query.resolutions || "";
  const resolutions = _resolutions ? _resolutions.split(",") : [];

  // Format file body
  const data = await formatBody(req, context);
  let dataImage: IImage;
  if (data && data.files?.length > 0) {
    dataImage = data.files.find((file) => file.name === FILE_PARAM);
  }
  // Control the data
  if (!resolutions?.length || resolutions.length <= 0) {
    status = 400;
    message = "No resolutions received";
  } else if (!dataImage) {
    status = 400;
    message = "No image received";
  } else {
    let resizeImagesPromises: Promise<IResizeResult>[] = [];
    for (const resolution of resolutions) {
      const _resolution = parseInt(resolution);
      if (!Number.isNaN(_resolution)) resizeImagesPromises.push(resizeImagePromise(context, dataImage, _resolution));
    }
    Promise.all(resizeImagesPromises)
      .then((results) => {
        const imagesToSave = results.filter((result) => result?.error === false);
        if (imagesToSave?.length > 0) void saveImages(context, imagesToSave);
      })
      .catch((err) => {
        context.log("Error processing the requests: ", err);
      });
  }

  // Response of the azure function
  context.res = {
    status /* Defaults to 200 */,
    body: {
      message,
    },
  };
};

// Prepare body - Retrieve the boundary id
const formatBody = async (req: HttpRequest, context: Context) => {
  return parseMultipartFormData(req).catch((err) => {
    context.log("Error processing the file: ", err);
  });
};

export default httpTrigger;
