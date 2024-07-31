import userRepository from "../repositories/UserRepository.js";
import { ApiError } from "../utils/ApiError.js";
import logger from "../config/Logger.js";
import config from "../config/CapstoneConfig.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { imageService } from "../services/ImageService.js";

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

  async retrieveUserByEmail(email) {
    return await this.#userRepository.findUserByEmail(email);
  }

  async updateUser(avatar, user, newUserInfo) {
    // Bind allowed attributes to the user model
    const allowedAttributes = ["fullname", "age"];
    this.#bindUserAttributes(user, newUserInfo, allowedAttributes);

    if (avatar) {
      // Remove previous picture from Cloudinary
      if (user.avatar) {
        await cloudinaryService.destroy(user.avatar);
        //TODO delete image
      }

      // Upload new profile picture
      const uploadResult = await cloudinaryService.upload(avatar);
      user.profilePictureUrl = uploadResult.secure_url;
      const image = await imageService.createImage(
        "avatar",
        uploadResult.secure_url,
        "avatar",
        null,
        uploadResult.public_id
      );
      user.avatar = uploadResult.public_id;

      user.save();

      return {
        ...user,
        avatar: image.path,
      };
    }
  }

  async addImage(image, user, imageInfo) {
    let result;
    if (image) {
      // Upload new profile picture
      const uploadResult = await cloudinaryService.upload(image);

      result = await imageService.createImage(
        imageInfo.name,
        uploadResult.secure_url,
        imageInfo.desc,
        user.user_id,
        uploadResult.public_id
      );
    } else {
      result = await imageService.createImage(
        imageInfo.name,
        null,
        imageInfo.desc,
        user.user_id,
        null
      );
    }
  }

  async #isEmailTaken(email) {
    const user = await this.#userRepository.findUserByEmail(email);
    return !!user;
  }

  #bindUserAttributes(user, requestBody, allowedAttributes) {
    allowedAttributes.forEach((attr) => {
      if (requestBody[attr] !== undefined) {
        user[attr] = requestBody[attr];
      }
    });
  }
}

// Export an instance of the UserService class
const userService = new UserService(userRepository);
export { userService };
