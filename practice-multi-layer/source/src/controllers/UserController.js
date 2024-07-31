import httpStatus from "http-status";
import { userService } from "../services/UserService.js";
import ResponseHelper from "../utils/ResponseHelper.js";
import { imageService } from "../services/ImageService.js";

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

  async retrieveProfile(req, res, next) {
    try {
      const profile = await userService.retrieveUserByEmail(req.user.userId);

      ResponseHelper.sendResponse(httpStatus.OK, "Success", profile, res);
    } catch (error) {
      next(error);
    }
  }

  async retrieveImages(req, res, next) {
    try {
      const { currentPage, itemPerPage } = req.query;

      const result = await imageService.fetchUserImages(
        await userService.retrieveUserByEmail(req.user.userId),
        currentPage,
        itemPerPage
      );

      ResponseHelper.sendResponse(httpStatus.OK, "Success", result, res);
    } catch (error) {
      next(error);
    }
  }

  async retrieveUserGallery(req, res, next) {
    try {
      const { currentPage, itemPerPage } = req.query;

      const result = await this.imageService.fetchUserImages(
        await userService.retrieveUserByEmail(req.user.userId),
        currentPage,
        itemPerPage
      );

      ResponseHelper.sendResponse(httpStatus.OK, "Success", result, res);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      //TODO needs to apply unit of work to handle transaction

      const { avatar, ...rest } = req.body;
      const result = await userService.updateUser(
        avatar,
        await userService.retrieveUserByEmail(req.user.userId),
        rest
      );
      ResponseHelper.sendResponse(
        httpStatus.OK,
        "User updated successfully",
        result,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async addImage(req, res, next) {
    try {
      const { image, ...rest } = req.body;
      const result = await userService.addImage(
        image,
        await userService.retrieveUserByEmail(req.user.userId),
        ...rest
      );

      ResponseHelper.sendResponse(
        httpStatus.CREATED,
        "The image was added successfully",
        result,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  async addGallery(req, res, next) {
    try {
      const { image_id } = req.body;

      const result = await imageService.addGallery(
        await userService.retrieveUserByEmail(req.user.userId),
        image_id
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController(); // Exporting a singleton instance
