import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema({
  path: {
    type: String,
    required: [true, "Path of the file is required"],
  },
  md5: {
    type: String,
    required: [true, "MD5 hash is required"],
  },
  resolucion: {
    height: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: null,
    },
  },
  original: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const ImageModel = mongoose.model("Image", ImageSchema);
