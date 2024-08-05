import express from "express";
import catchAsync from "../utils/asyncHandler.js";
import multimedia from "../middlewares/MultiMediaMiddleware.js";
import {
  deletePhysicalImage,
  uploadImage,
} from "../controllers/MultimediaController.js";
import validate from "../validations/Validator.js";
import { multimediaSchema } from "../validations/MultimediaSchema.js";

const multimediaRouter = express.Router();

multimediaRouter.post(
  "/multimedia",
  multimedia.single("image"),
  (req, res, next) => {
    req.body.image = req.file;
    next();
  },
  validate(multimediaSchema),
  catchAsync(uploadImage)
);
multimediaRouter.delete(
  "/multimedia/:fileName",
  catchAsync(deletePhysicalImage)
);

export default multimediaRouter;
