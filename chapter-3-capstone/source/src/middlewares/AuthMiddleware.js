import httpStatus from "http-status";
import { ApiError } from "../utils/ApiError.js";
import config from "../config/CapstoneConfig.js";
import jwt from "jsonwebtoken";
import logger from "../config/Logger.js";

const authorize = (req, res, next) => {
  //   // Skip authorization for /public endpoint
  //   logger.info(req.path);
  //   if (req.path.startsWith("/public")) {
  //     logger.info("=============");
  //     return next();
  //   }

  // Get the token from the request header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is found, respond with an error
  if (!token) {
    next(new ApiError(httpStatus.FORBIDDEN, "Access denied"));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.auth.secret);
    // Attach the decoded user information to the request object
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, respond with an error
    next(new ApiError(httpStatus.BAD_REQUEST, "Invalid token."));
  }
};

export default authorize;
