import express from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import userController from "../controllers/UserController.js";

const authRouter = express.Router();

authRouter.post("/register", AsyncHandler.catchAsync(userController.register));
authRouter.post(
  "/authenticate",
  AsyncHandler.catchAsync(userController.authenticate)
);

export default authRouter;
