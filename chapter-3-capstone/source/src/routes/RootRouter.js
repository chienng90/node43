import express from "express";
import authRouter from "./AuthRouter.js";
import config from "../config/CapstoneConfig.js";
import authorize from "../middlewares/AuthMiddleware.js";
import userRouter from "./userRouter.js";
import multimediaRouter from "./MultimediaRouter.js";
import imageRouter from "./ImageRouter.js";
import commentRouter from "./CommentRouter.js";
import bookmarkRouter from "./BookmarkRouter.js";

const rootRouter = express.Router();

rootRouter.use(config.server.contextPath, authRouter);
rootRouter.use(authorize);
rootRouter.use(config.server.contextPath, userRouter);
rootRouter.use(config.server.contextPath, multimediaRouter);
rootRouter.use(config.server.contextPath, imageRouter);
rootRouter.use(config.server.contextPath, commentRouter);
rootRouter.use(config.server.contextPath, bookmarkRouter);

export default rootRouter;
