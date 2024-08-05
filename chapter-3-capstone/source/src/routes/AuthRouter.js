import express from "express";
import catchAsync from "../utils/asyncHandler.js";
import { authenticate, register } from "../controllers/AuthController.js";
import validate from "../validations/Validator.js";
import { registerSchema } from "../validations/UserSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), catchAsync(register));
authRouter.post("/authenticate", catchAsync(authenticate));

export default authRouter;
