import express from "express";
import { authenticate, register } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/authenticate", authenticate);
authRouter.post("/register", register);

export default authRouter;