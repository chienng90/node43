import express from "express";
import authRouter from "./AuthRoute.js";
import config from "../config/CapstoneConfig.js";
import imageRouter from "./ImageRoute.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import commentRouter from "./CommentRoute.js";
import userRouter from "./UserRoute.js";
import unprotectedRouter from "../routes/Unprotected.js";

const rootRouter = express.Router();

rootRouter.use(config.getServerConfig().contextPath, authRouter);
rootRouter.use(config.getServerConfig().contextPath, unprotectedRouter);
rootRouter.use(AuthMiddleware.authorize);
rootRouter.use(config.getServerConfig().contextPath, imageRouter);
rootRouter.use(config.getServerConfig().contextPath, commentRouter);
rootRouter.use(config.getServerConfig().contextPath, userRouter);

export default rootRouter;
