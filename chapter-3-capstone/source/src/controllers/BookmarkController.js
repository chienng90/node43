import httpStatus from "http-status";
import sendResponse from "../utils/ResponseHelper.js";
import { getUserByEmail } from "../services/UserService.js";
import { getImage } from "../services/ImageService.js";
import { ApiError } from "../utils/ApiError.js";
import {
  createImageBookmark,
  fetchImageBookmark,
  fetchImageBookmarks,
} from "../services/BookmarkService.js";
import config from "../config/CapstoneConfig.js";

const retrieveImageBookmarks = async (req, res, next) => {
  try {
    const { currentPage, itemPerPage } = req.query;
    const offset =
      currentPage === undefined ? 0 : parseInt(currentPage) - 1 || 0;
    const limit = parseInt(itemPerPage) || config.pagination.pageSize;

    let result = await fetchImageBookmarks(
      await getUserByEmail(req.user.userId),
      {
        offset,
        limit,
      }
    );

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

const bookmarkImage = async (req, res, next) => {
  try {
    const imageId = req.params.imageId;
    const user = await getUserByEmail(req.user.userId);

    const image = await getImage(imageId);
    if (!image) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The imageId: #${imageId} is not exist`
      );
    }

    if (user.id === image.user.id) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `You are owner of the image: #${imageId}`
      );
    }

    if (!!(await fetchImageBookmark(user, imageId))) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The imageId: #${imageId} was bookmark`
      );
    }

    const result = await createImageBookmark(user, imageId);
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

const retrieveImageBookmark = async (req, res, next) => {
  try {
    sendResponse(
      httpStatus.OK,
      "Success",
      await fetchImageBookmark(
        await getUserByEmail(req.user.userId),
        req.params.imageId
      ),
      res
    );
  } catch (error) {
    next(error);
  }
};

export { retrieveImageBookmarks, bookmarkImage, retrieveImageBookmark };
