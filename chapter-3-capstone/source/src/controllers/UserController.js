import httpStatus from "http-status";
import { userService } from "../services/UserService.js";
import ResponseHelper from "../utils/ResponseHelper.js";

class UserController {
  async register(req, res, next) {
    try {
      const { fullname, email, password } = req.body;
      const user = await userService.register(fullname, email, password);
      ResponseHelper.sendResponse(
        httpStatus.CREATED,
        "Success",
        { ...user.dataValues, password: "***" }, // hidden password
        res
      );
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  }

  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await userService.authenticate(email, password);
      ResponseHelper.sendResponse(
        httpStatus.OK,
        "Success",
        { token: token },
        res
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController(); // Exporting a singleton instance
