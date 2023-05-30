import * as fs from "node:fs";
import { Request, ResponseToolkit } from "@hapi/hapi";
import Logger from "../core/logger";
import { StatusTask } from "../utils/constants";

import Hash from "../utils/hash";
import ImageUtils, { IFile } from "../utils/image-utils";

import { TaskModel, ImageModel } from "../models";

export class TaskService {
  public static async getTaskById(request: Request, response: ResponseToolkit) {
    const task = await TaskModel.findOne({ id: request.params.id });
    if (!task) throw new Error("Task couldn't by found by md5 identifier");
    task.status = StatusTask[task.statusId];
    return task; // We could do a map to avoid certain properties with lodash or custom method
  }

  public static async postTask(request: Request, response: ResponseToolkit) {
    // Get the properties
    const file: IFile = (request.payload as IPayloadPostTask).file || {};
    const image = ImageUtils.generateInformationImage(file);
    const md5 = Hash.md5(image.buffer);
    const { path, folderPath, fullPath } = ImageUtils.generatePath(image, md5);
    // Create dir
    fs.mkdirSync(folderPath, { recursive: true });
    // Save the file
    fs.writeFile(fullPath, image.buffer, (err) => {
      if (err) throw new Error(`File ${image.fullFileName} couldn't saved: ${err?.message}`);
      else Logger.debug("TaskService", `File ${image.fullFileName} saved successfully`);
    });
    // Save the image information in database
    const newImage = new ImageModel({ path: path, md5, resolucion: { height: image.resolution.height, width: image.resolution.width }, original: true });
    await newImage.save();
    Logger.debug("TaskService", `ImageModel ${md5} saved successfully`);
    // Save the task in database and return the id
    const newTask = new TaskModel({ id: md5, path: path });
    await newTask.save();
    Logger.debug("TaskService", `TaskModel ${md5} saved successfully`);
    return md5;
  }
}
