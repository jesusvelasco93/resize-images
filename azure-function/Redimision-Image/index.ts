// import { resizeImg } from "resize-img";
const resizeImg = require("resize-img");
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  let status = 200;
  let message = "Success";
  let response = {};
  const _resolutions = req.query.resolutions || "";
  const resolutions = _resolutions ? _resolutions.split(",") : [];

  if (resolutions?.length > 0) {
    const image = req.bufferBody;
    for await (const resolution of resolutions) {
      console.log(resizeImg);
      console.log(resolution);
      response[resolution] = await resizeImg(image, {
        width: resolution,
      });
    }
  } else {
    status = 400;
    message = "No resolutions receive";
  }
  context.res = {
    status /* Defaults to 200 */,
    body: {
      message,
      response,
    },
  };
};

export default httpTrigger;
