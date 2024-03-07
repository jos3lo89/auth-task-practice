import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
    },
  },
  {
    versionKey: false,
  }
);

const taskModel = mongoose.model("task", taskSchema);

export default taskModel;
