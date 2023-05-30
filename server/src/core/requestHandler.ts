import { Request, ResponseToolkit } from "@hapi/hapi";
import Logger from "./logger";

const RequestHandler = {
  globalRequestHandler: (request: Request, response: ResponseToolkit) => {
    Logger.debug("RequestHandler", `${request.method.toUpperCase()} request to ${request.url.pathname}`);
    return response.continue;
  },
};

export default RequestHandler;
