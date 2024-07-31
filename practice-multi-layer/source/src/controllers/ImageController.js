import httpStatus from "http-status";
import ResponseHelper from "../utils/ResponseHelper.js";
import { imageService } from "../services/ImageService.js";
import { userService } from "../services/UserService.js";
import logger from "../config/Logger.js";

class ImageController {
  async freeTextSearch(req, res, next) {
    try {
      const { freeText, currentPage, itemPerPage } = req.query;

      const images = await imageService.freeTextSearch(
        freeText,
        currentPage,
        itemPerPage
      );
      ResponseHelper.sendResponse(httpStatus.OK, "Success", images, res);
    } catch (error) {
      logger.info(error);
      next(error); // Pass the error to the next middleware
    }
  }
  async retrieveImage(req, res, next) {
    try {
      const result = await imageService.retrieveImage(req.params.imageId);

      ResponseHelper.sendResponse(httpStatus.OK, "Success", result, res);
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  }

  async existImageInGallery(req, res, next) {
    try {
      const existImage = await imageService.existImageInGallery(
        await userService.retrieveUserByEmail(req.user.userId),
        req.params.imageId
      );
      if (existImage) {
        ResponseHelper.sendResponse(
          httpStatus.OK,
          "The image is exist",
          null,
          res
        );
      }

      ResponseHelper.sendResponse(
        httpStatus.NOT_FOUND,
        "The image is not found",
        null,
        res
      );
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  }

  async deleteImage(req, res, next) {
    try {
      await imageService.deleteImage(
        await userService.retrieveUserByEmail(req.user.userId),
        req.params.imageId
      );
      ResponseHelper.sendResponse(
        httpStatus.OK,
        "Image deleted successfully.",
        null,
        res
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new ImageController(); // Exporting a singleton instance
