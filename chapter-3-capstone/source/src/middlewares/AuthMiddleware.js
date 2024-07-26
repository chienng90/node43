import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";
import config from "../config/CapstoneConfig.js";

class AuthMiddleware {
  static authorize(req, res, next) {
    // Get the token from the request header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // If no token is found, respond with an error
    if (!token) {
      next(new ApiError(httpStatus.FORBIDDEN, "Access denied"));
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, config.getAuthConfig().secret);
      // Attach the decoded user information to the request object
      req.user = decoded;
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // If the token is invalid, respond with an error
      next(new ApiError(httpStatus.BAD_REQUEST, "Invalid token."));
    }
  }
}

export default AuthMiddleware;
