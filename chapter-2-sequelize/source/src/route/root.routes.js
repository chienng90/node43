import express from "express";
import config from "../config/config.js";
import authMiddleware from "./auth.middleware.js";
import authRouter from "./auth.routes.js";
import foodRouter from "./food.routes.js";
import restaurantRouter from "./restaurant.routes.js";
import orderRouter from "./order.routes.js";

const rootRouter = express.Router();

rootRouter.use(config.server.contextPath, authRouter)
rootRouter.use(config.server.contextPath, authMiddleware, foodRouter)
rootRouter.use(config.server.contextPath, authMiddleware, restaurantRouter)
rootRouter.use(config.server.contextPath, authMiddleware, foodRouter)
rootRouter.use(config.server.contextPath, authMiddleware, orderRouter)

export default rootRouter