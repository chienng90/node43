import express from "express";
import catchAsync from "../utils/asyncHandler.js";
import {
  postComment,
  retrieveComments,
} from "../controllers/CommentController.js";
import { commentSchema } from "../validations/CommentSchema.js";
import validate from "../validations/Validator.js";

const commentRouter = express.Router();

commentRouter.get("/images/:imageId/comments", catchAsync(retrieveComments));
commentRouter.post(
  "/images/:imageId/comments",
  validate(commentSchema),
  catchAsync(postComment)
);

export default commentRouter;
