import httpStatus from "http-status";
import ResponseHelper from "../utils/ResponseHelper.js";
import { commentService } from "../services/CommentService.js";
import { userService } from "../services/UserService.js";

class CommentController {
  async retrieveImages(req, res, next) {
    try {
      const { currentPage, itemPerPage } = req.query;
      const imageId = req.params.imageId;

      const comments = await commentService.retrieveComments(
        await userService.retrieveUserByEmail(req.user.userId),
        imageId,
        currentPage,
        itemPerPage
      );
      ResponseHelper.sendResponse(httpStatus.OK, "Success", comments, res);
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  }

  async comment(req, res, next) {
    try {
      const comment = await commentService.comment(
        await userService.retrieveUserByEmail(req.user.userId),
        req.params.imageId,
        { ...req.body }
      );

      ResponseHelper.sendResponse(httpStatus.CREATED, "Success", comment, res);
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  }
}

export default new CommentController(); // Exporting a singleton instance
