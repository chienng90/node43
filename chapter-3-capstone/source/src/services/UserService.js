import userRepository from "../repositories/UserRepository.js";
import { ApiError } from "../utils/ApiError.js";
import logger from "../config/Logger.js";
import config from "../config/CapstoneConfig.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

class UserService {
  #userRepository;

  constructor(userRepo) {
    this.#userRepository = userRepo;
  }

  async register(fullname, email, password) {
    if (await this.#isEmailTaken(email)) {
      logger.warn("Email already taken");
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }

    return await this.#userRepository.createUser(
      fullname,
      email,
      bcrypt.hashSync(password, config.getAuthConfig().salt)
    );
  }

  async authenticate(email, password) {
    const user = await this.#userRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(httpStatus.FORBIDDEN, "Email is incorrect");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(httpStatus.FORBIDDEN, "Password is incorrect");
    }

    return jwt.sign({ userId: user.email }, config.getAuthConfig().secret, {
      expiresIn: config.getAuthConfig().expiresIn,
    });
  }

  async #isEmailTaken(email) {
    const user = await this.#userRepository.findUserByEmail(email);
    return !!user;
  }
}

// Export an instance of the UserService class
const userService = new UserService(userRepository);
export { userService };
