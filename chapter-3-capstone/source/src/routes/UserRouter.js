import express from "express";
import catchAsync from "../utils/asyncHandler.js";
import {
  deleteImageBU,
  retrieveImageBookmarksBU,
  retrieveImageBU,
  retrieveImagesBU,
  retrieveProfile,
  updateProfile,
} from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.get("/profile", catchAsync(retrieveProfile));
userRouter.put("/profile", updateProfile);
userRouter.get("/profile/images", catchAsync(retrieveImagesBU));
userRouter.get("/profile/images/:imageId", catchAsync(retrieveImageBU));
userRouter.get("/profile/bookmarks", catchAsync(retrieveImageBookmarksBU));
userRouter.delete("/profile/images/:imageId", catchAsync(deleteImageBU));

export default userRouter;
