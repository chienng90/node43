import express from "express";
import catchAsync from "../utils/asyncHandler.js";
import {
  postImage,
  retrieveImage,
  retrieveImages,
} from "../controllers/ImageController.js";

const imageRouter = express.Router();

imageRouter.get("/images", catchAsync(retrieveImages));
imageRouter.get("/images/:imageId", catchAsync(retrieveImage));
imageRouter.post("/images", catchAsync(postImage));

export default imageRouter;
