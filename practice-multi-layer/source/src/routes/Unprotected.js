import express from "express";
import AsyncHandler from "../utils/asyncHandler.js";
import unprotectedController from "../controllers/UnprotectedController.js";

const unprotectedRouter = express.Router();

unprotectedRouter.get(
  "/unprotected",
  AsyncHandler.catchAsync(unprotectedController.unprotected)
);

export default unprotectedRouter;
