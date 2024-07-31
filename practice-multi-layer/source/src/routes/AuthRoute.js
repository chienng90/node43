import express from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import userController from "../controllers/UserController.js";
import UserSchema from "../validations/UserSchema.js";
import Validator from "../validations/Validator.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  Validator.validate(UserSchema.register),
  AsyncHandler.catchAsync(userController.register)
);
authRouter.post(
  "/authenticate",
  AsyncHandler.catchAsync(userController.authenticate)
);

export default authRouter;
