import mongoose, { Schema } from "mongoose";
import { StatusTask } from "../utils/constants";

const TaskSchema = new Schema({
  id: {
    unique: true,
    type: String,
    required: [true, "Id is required (MD5)"],
  },
  path: {
    type: String,
    required: [true, "Path is required"],
  },
  status: {
    type: String, // Only for the interface
  },
  statusId: {
    type: Number,
    required: [true, "Status is required"],
    default: StatusTask.Pending,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const TaskModel = mongoose.model("Tasks", TaskSchema);
