import { Request, ResponseToolkit } from "@hapi/hapi";

const Validation = {
  explicitResponse: (request: Request, response: ResponseToolkit, err) => {
    console.error(err);
    throw err;
  },
};

export default Validation;
