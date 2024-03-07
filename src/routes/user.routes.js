import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyToken,
} from "../controllers/userController.js";
import { dataValidator } from "../middlewares/userDataValidator.js";
import { loginSchemaZ, registerSchemaZ } from "../schemas/userSchema.js";
import { authValidator } from "../middlewares/authValidator.js";

const userRouter = Router();

userRouter.post("/user/register", dataValidator(registerSchemaZ), registerUser);
userRouter.post("/user/login", dataValidator(loginSchemaZ), loginUser);
userRouter.post("/user/logout", authValidator, logoutUser);
userRouter.get("/user/verify", authValidator, verifyToken);

export default userRouter;
