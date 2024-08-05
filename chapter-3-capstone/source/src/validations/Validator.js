import httpStatus from "http-status";
import { ApiError } from "../utils/ApiError.js";

/**
 * Validates the request body against the given schema.
 * @param {Object} schema - The validation schema.
 * @returns {Function} - Middleware function for validation.
 */
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    // Create a comprehensive error message
    const errorMessages = error.details
      .map((detail) => detail.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessages));
  }

  next();
};

export default validate;
