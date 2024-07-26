import httpStatus from "http-status";
import ResponseHelper from "../utils/ResponseHelper.js";
import { imageService } from "../services/ImageService.js";

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
}

export default new ImageController(); // Exporting a singleton instance
