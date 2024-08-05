import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import rootRouter from "./routes/RootRouter.js";
import { errorConverter, errorHandler } from "./middlewares/ErrorMiddleware.js";
import config from "./config/CapstoneConfig.js";
import logger from "./config/Logger.js";
import connect from "./models/Connect.js";
import { ApiError } from "./utils/ApiError.js";
import httpStatus from "http-status";

const app = express();

// Parser JSON request body
app.use(bodyParser.json({}));

// Enable CORS
app.use(cors());
app.options("*", cors());

app.use(express.static("public"));

//TODO Inject rootRouter
app.use(rootRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "The API is not support"));
});

// Convert error
app.use(errorConverter);

// Convert Error to JSON
app.use(errorHandler);

app.listen(config.server.port, async () => {
  logger.info(`Server is running on http://localhost:${config.server.port}`);
  try {
    await connect.authenticate();
    logger.info("Database connected!");
  } catch (error) {
    logger.error("Unable to connect to the database");
  }
});
