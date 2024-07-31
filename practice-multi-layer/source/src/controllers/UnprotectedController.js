import httpStatus from "http-status";
import ResponseHelper from "../utils/ResponseHelper.js";

class UnprotectedController {
  async unprotected(req, res, next) {
    try {
      ResponseHelper.sendResponse(httpStatus.OK, "Test unprotected", null, res);
    } catch (error) {
      next(error);
    }
  }
}

export default new UnprotectedController(); // Exporting a singleton instance
