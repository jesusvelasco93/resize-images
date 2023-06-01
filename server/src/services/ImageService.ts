import * as fs from "node:fs";
import { Request, ResponseToolkit } from "@hapi/hapi";
import Logger from "../core/logger";

import Hash from "../utils/hash";
import { StatusTask } from "../utils/constants";
import ImageUtils, { IFile } from "../utils/image-utils";

import { TaskModel, ImageModel } from "../models";
import { IPayloadPostImages } from "../interfaces/PayloadInterfaces";

export class ImageService {
  public static async postImage(request: Request, response: ResponseToolkit) {
    const files: IFile[] = (request.payload as IPayloadPostImages).files || [];
    for await (const file of files) {
      // Get the properties
      const image = ImageUtils.generateInformationImage(file);
      const md5 = Hash.md5(image.buffer);
      const _width = image.resolution.width && `${image.resolution.width}`; // avoid send `null`|`undefined`
      const { path, folderPath, fullPath } = ImageUtils.generatePath(image, md5, _width);
      // Create dir
      fs.mkdirSync(folderPath, { recursive: true });
      // Save the file
      fs.writeFile(fullPath, image.buffer, (err) => {
        if (err) throw new Error(`File ${image.fullFileName} couldn't saved: ${err?.message}`);
        else Logger.debug("ImageService", `File ${image.fullFileName} saved successfully`);
      });
      // Save the image information in database
      const newImage = new ImageModel({ path: path, md5, resolucion: { height: image.resolution.height, width: image.resolution.width } });
      await newImage.save();
      Logger.debug("ImageService", `ImageModel ${md5} saved successfully`);
    }
    // Update the status of the task in database and return the id
    const task = await TaskModel.findOne({ id: request.query.id });
    if (task) {
      task.statusId = StatusTask.End;
      await task.save();
      Logger.debug("ImageService", `TaskModel ${task.id} updated successfully`);
    }
    return "Done";
  }
}
