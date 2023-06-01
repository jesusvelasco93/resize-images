import { Context } from "@azure/functions";
import Axios, { AxiosInstance } from "axios";

import { IImage, IResizeResult } from "./interfaces";
import { API_BASE_PATH } from "./constants";

const resizeImg = require("resize-img");

// Generic HTTP instance for all request
function http(): AxiosInstance {
  const options: any = {
    baseURL: API_BASE_PATH,
    headers: {},
  };
  return Axios.create(options);
}

// Save the images to the Server
export const saveImages = async (context: Context, id: string, images: IResizeResult[]) => {
  const formData = new FormData();
  for (const image of images) {
    const blobFromBuffer = new Blob([image.image]);
    formData.append("files", blobFromBuffer, image.filename);
  }
  http()
    .post(`/api/images?id=${id}`, formData)
    .catch((err) => {
      context.log("Error posting new images to the server", err);
    });
  context.log("Posted new images to the server");
};

// Force sync response and resize
export const resizeImagePromise = async (context: Context, dataImage: IImage, resolution: number): Promise<IResizeResult> => {
  let error = false;
  const resizeImage = await resizeImg(dataImage.bufferFile, {
    width: resolution,
  }).catch((err) => {
    context.log("Error resizing the image: ", err);
    error = true;
  });
  return {
    error: error,
    filename: dataImage.filename,
    width: resolution,
    image: resizeImage,
  };
};
