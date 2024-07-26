import express from "express";
import authRouter from "./AuthRoute.js";
import config from "../config/CapstoneConfig.js";
import imageRouter from "./ImageRoute.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const rootRouter = express.Router();

rootRouter.use(config.getServerConfig().contextPath, authRouter);
rootRouter.use(
  config.getServerConfig().contextPath,
  AuthMiddleware.authorize,
  imageRouter
);

export default rootRouter;
