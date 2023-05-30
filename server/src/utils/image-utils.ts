import sizeOf from "buffer-image-size";
import { defaultPath, dirOut } from "./constants";

export interface IFile {
  headers: any;
  filename: string;
  payload: Buffer;
}

interface IImage {
  fullFileName: string;
  fileName: string;
  extension: string;
  resolution: {
    width: number;
    height: number;
  };
  buffer: Buffer;
}

const ImageUtils = {
  generateInformationImage: (image: IFile) => {
    const _filename = image.filename || "";
    const splitFileName = (image.filename || "").split(".");
    // Resolution
    const resolution = ImageUtils.getResolution(image.payload);
    // Format response
    const generateInfImage: IImage = {
      fullFileName: image.filename,
      fileName: splitFileName[0] || _filename,
      extension: splitFileName[1] || "",
      resolution: {
        width: resolution.width || null,
        height: resolution.height || null,
      },
      buffer: image.payload,
    };
    return generateInfImage;
  },
  getResolution: (buffer: Buffer) => {
    let resolution = { width: null, height: null };
    try {
      resolution = sizeOf(buffer);
    } catch (ex) {
      throw new Error(`The resolution of the image couldn't be calculated. ${ex}`);
    }
    return resolution;
  },
  generatePath: (image: IImage, md5: string, width: string = defaultPath) => {
    const path = `/${image.fileName}/${defaultPath}`;
    const pathServer = `./${dirOut}/${image.fileName}/${defaultPath}`;
    return {
      path: path,
      fullPath: `${pathServer}/${md5}.${image.extension}`,
      folderPath: pathServer,
    };
  },
};

export default ImageUtils;
