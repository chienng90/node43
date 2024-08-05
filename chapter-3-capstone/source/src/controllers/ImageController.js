import httpStatus from "http-status";
import {
  createImage,
  fetchImages,
  getImage,
  searchImages,
} from "../services/ImageService.js";
import sendResponse from "../utils/ResponseHelper.js";
import { ApiError } from "../utils/ApiError.js";
import { getUserByEmail } from "../services/UserService.js";
import config from "../config/CapstoneConfig.js";

const retrieveImages = async (req, res, next) => {
  try {
    const { freeText, currentPage, itemPerPage } = req.query;
    const offset =
      currentPage === undefined ? 0 : parseInt(currentPage) - 1 || 0;
    const limit = parseInt(itemPerPage) || config.pagination.pageSize;

    let result;
    if (freeText === undefined || freeText.trim() === "") {
      result = await fetchImages({
        offset,
        limit,
      });
    } else {
      result = await searchImages(freeText, {
        offset,
        limit,
      });
    }
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
        freeText,
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

const retrieveImage = async (req, res, next) => {
  try {
    const image = await getImage(req.params.imageId);
    if (!image) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The image: #${req.params.imageId} is not exist`
      );
    }

    sendResponse(httpStatus.OK, "Success", image, res);
  } catch (error) {
    next(error);
  }
};

const postImage = async (req, res, next) => {
  try {
    const { name, path, desc } = req.body;
    const image = await createImage(
      await getUserByEmail(req.user.userId),
      name,
      path,
      desc
    );

    sendResponse(httpStatus.CREATED, "The image post successfully", image, res);
  } catch (error) {
    next(error);
  }
};

export { retrieveImages, retrieveImage, postImage };
