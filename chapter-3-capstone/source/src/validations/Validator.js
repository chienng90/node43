import httpStatus from "http-status";
import { ApiError } from "../utils/ApiError.js";

class Validator {
  static validate(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        // Create a comprehensive error message
        const errorMessages = error.details
          .map((detail) => detail.message)
          .join(", ");
        next(new ApiError(httpStatus.BAD_REQUEST, errorMessages));
      }

      next();
    };
  }
}

export default Validator;
