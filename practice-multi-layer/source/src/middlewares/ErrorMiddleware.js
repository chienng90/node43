import httpStatus from "http-status";
import { ApiError } from "../utils/ApiError.js";
import ResponseHelper from "../utils/ResponseHelper.js";

class ErrorMiddleware {
  static errorConverter(err, req, res, next) {
    let error = err;
    if (!(error instanceof ApiError)) {
      const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];
      error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
  }

  static errorHandler(err, req, res, next) {
    let { statusCode, message } = err;
    if (!err.isOperational) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
      ...{ stack: err.stack },
    };
    ResponseHelper.sendResponse(statusCode, message, response, res);
  }
}

export default ErrorMiddleware;
