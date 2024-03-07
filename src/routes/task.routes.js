import { Router } from "express";
import { authValidator } from "../middlewares/authValidator.js";
import {
  createTask,
  deleteTask,
  foundTask,
  updateTask,
} from "../controllers/taskController.js";
import { dataValidator } from "../middlewares/userDataValidator.js";
import { taskSchemaZ } from "../schemas/taskSchema.js";

const taskRouter = Router();

taskRouter.post(
  "/task/create",
  authValidator,
  dataValidator(taskSchemaZ),
  createTask
);
taskRouter.get("/task/found", authValidator, foundTask);
taskRouter.delete("/task/delete/:id", authValidator, deleteTask);
taskRouter.put(
  "/task/update/:id",
  authValidator,
  dataValidator(taskSchemaZ),
  updateTask
);

export default taskRouter;
