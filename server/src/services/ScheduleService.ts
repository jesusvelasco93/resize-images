import * as fs from "node:fs";
import Logger from "../core/logger";
import { AZURE_FUNCTION, FILE_PARAM, StatusTask } from "../utils/constants";

import { http } from "../utils/http";
import ImageUtils from "../utils/image-utils";

import { TaskModel } from "../models";

export class ScheduleService {
  // That should to be the Azure Function Trigger with connector of DataBase or Azure Blob Storage
  public static async postTaskImage() {
    Logger.debug("TaskService", `Launch automatic post task image..`);
    // Find tasks in pending
    const tasks = (await TaskModel.find({ statusId: StatusTask.Pending })) || [];
    if (!tasks || tasks.length === 0) Logger.debug("TaskService", `No tasks images for automatic..`);
    // Foreach one
    for await (const task of tasks) {
      // Update the status to processing
      task.statusId = StatusTask.Procesing;
      await task.save();
      // Get the image
      const image: Buffer = fs.readFileSync(`.${task.path}`);
      if (image) {
        const filename = ImageUtils.generateFileNameToPost(task.path, "original", task.id); // Generate from path
        // Generate formData
        const formData = new FormData();
        const blobFromBuffer = new Blob([image]);
        formData.append(FILE_PARAM, blobFromBuffer, filename);
        // Send the request
        // const headers = { "Content-Type": "multipart/form-data" };
        const result = await http()
          .post(`/api/${AZURE_FUNCTION}?resolutions=800,1024&id=${task.id}`, formData)
          .catch(async (err) => {
            // Update the status to processing
            task.statusId = StatusTask.Error;
            await task.save();
            Logger.error("TaskService", `Error launching automatic processing of image ${task.id}. ${err}`);
          });
        // Update the status
        if (result && result.status === 200) {
          Logger.debug("TaskService", `Request receive successfully`);
        }
      } else {
        Logger.error("TaskService", `Image file not found ${task.id}`);
      }
    }
    Logger.debug("TaskService", `Finish automatic post task image`);
    return true;
  }
}
