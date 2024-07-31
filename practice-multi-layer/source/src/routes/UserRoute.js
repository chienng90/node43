import express from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import userController from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const userRouter = express.Router();

userRouter.post(
  "/profile",
  AuthMiddleware.authorize,
  AsyncHandler.catchAsync(userController.retrieveProfile)
);
userRouter.get(
  "/profile/images",
  AsyncHandler.catchAsync(userController.retrieveImages)
);
userRouter.post(
  "/profile/images",
  AsyncHandler.catchAsync(userController.addImage)
);
userRouter.get(
  "/profile/gallery",
  AsyncHandler.catchAsync(userController.retrieveUserGallery)
);
userRouter.post(
  "/profile/gallery",
  AsyncHandler.catchAsync(userController.addGallery)
);
userRouter.put(
  "profile",
  AsyncHandler.catchAsync(userController.updateProfile)
);

export default userRouter;
