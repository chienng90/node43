import httpStatus from "http-status";
import sendResponse from "../utils/ResponseHelper.js";
import { createComment, fetchComments } from "../services/CommentService.js";
import { getUserByEmail } from "../services/UserService.js";
import { getImage } from "../services/ImageService.js";
import { ApiError } from "../utils/ApiError.js";
import config from "../config/CapstoneConfig.js";

const retrieveComments = async (req, res, next) => {
  try {
    const { currentPage, itemPerPage } = req.query;
    const offset =
      currentPage === undefined ? 0 : parseInt(currentPage) - 1 || 0;
    const limit = parseInt(itemPerPage) || config.pagination.pageSize;

    let result = await fetchComments(req.params.imageId, {
      offset,
      limit,
    });

    sendResponse(
      httpStatus.OK,
      "Success",
      {
        data: [...result.data],
        pagination: {
          items: result.pagination.items,
          pages: result.pagination.pages,
          currentPage: result.pagination.offset + 1,
          itemPerPage: result.pagination.limit,
        },
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

const postComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const imageId = req.params.imageId;

    if (!(await getImage(imageId))) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The imageId: #${imageId} is not exist`
      );
    }

    const result = await createComment(
      await getUserByEmail(req.user.userId),
      imageId,
      content
    );
    sendResponse(
      httpStatus.CREATED,
      "The comment post successfully",
      result,
      res
    );
  } catch (error) {
    next(error);
  }
};

export { retrieveComments, postComment };
