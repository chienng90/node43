import express from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import imageController from "../controllers/ImageController.js";

const imageRouter = express.Router();

imageRouter.get(
  "/images",
  AsyncHandler.catchAsync(imageController.freeTextSearch)
);

imageRouter.get(
  "/images/:imageId",
  AsyncHandler.catchAsync(imageController.retrieveImage)
);

export default imageRouter;
