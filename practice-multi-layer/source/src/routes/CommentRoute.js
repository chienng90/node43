import express from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import commentController from "../controllers/CommentController.js";

const commentRouter = express.Router();

commentRouter.get(
  "/images/:imageId/comments",
  AsyncHandler.catchAsync(commentController.retrieveImages)
);

commentRouter.post(
  "/images/:imageId/comments",
  AsyncHandler.catchAsync(commentController.comment)
);

export default commentRouter;
