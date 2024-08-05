import sendResponse from "../utils/ResponseHelper.js";
import { createUser, generateToken } from "../services/UserService.js";
import httpStatus from "http-status";

const register = async (req, res, next) => {
  try {
    const { fullname, email, age, password } = req.body;
    const user = await createUser(fullname, email, age, password);

    sendResponse(
      httpStatus.CREATED,
      "Success",
      { ...user.dataValues, password: undefined }, // hidden password
      res
    );
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await generateToken(email, password);

    sendResponse(httpStatus.OK, "Success", { token }, res);
  } catch (error) {
    next(error);
  }
};

export { register, authenticate };
