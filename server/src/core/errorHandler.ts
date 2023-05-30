import { Boom } from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppConfig } from "./appConfig";

interface CustomErrorResponse {
  errorName: string;
  message: string;
  extraInformation: string;
  data?: any;
}

const ErrorHandler = {
  globalErrorHandler: (request: Request, response: ResponseToolkit) => {
    const _response = request.response;
    if (!(_response instanceof Boom)) {
      return response.continue;
    }
    // Get data from appConfig
    const appConfig = new AppConfig();
    // Get extra information
    const error = _response ?? ({} as Boom);
    const errorName = error.name || "UnknownError";
    const errorMessage = error.data?.defaultError?.message || error.message || "UnknownError";
    const errorData = error.data || undefined;
    // Generate custom response
    const customResponse: CustomErrorResponse = {
      errorName,
      message: errorMessage,
      extraInformation: error.message,
    };
    // Add more information of error
    if (appConfig.server.explicitError) customResponse.data = errorData;

    // Control no code errors in catch and generate custom Boom error
    if (error.message === "InternalError") {
      return response.response(customResponse).code(500);
    } else if (error.message === "Not Found") {
      return response.response(customResponse).code(404);
    } else {
      return response.response(customResponse).code(400);
    }
  },
};

export default ErrorHandler;
