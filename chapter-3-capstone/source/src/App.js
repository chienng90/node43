import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connect from "./models/Database.js";
import config from "./config/CapstoneConfig.js";
import rootRouter from "./routes/RootRoute.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import logger from "./config/Logger.js";
import { ApiError } from "./utils/ApiError.js";
import httpStatus from "http-status";

const app = express();

// Parser JSON request body
app.use(bodyParser.json({}));

// Enable CORS
app.use(cors());
app.options("*", cors());

// Inject rootRoute
app.use(rootRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Convert error
app.use(ErrorMiddleware.errorConverter);

// Convert Error to JSON
app.use(ErrorMiddleware.errorHandler);

app.listen(config.getServerConfig().port, async () => {
  logger.info(
    `Server is running on http://localhost:${config.getServerConfig().port}`
  );
  try {
    await connect.authenticate();
    logger.info("Database connected!");
  } catch (error) {
    logger.info("Unable to connect to the database");
  }
});
