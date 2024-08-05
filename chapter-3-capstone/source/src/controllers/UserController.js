import httpStatus from "http-status";
import {
  destroyImageBU,
  fetchImageBookmarksBU,
  fetchImageBU,
  fetchImagesBU,
  getUserByEmail,
  searchImageBookmarksBU,
  searchImagesBU,
  updateUser,
} from "../services/UserService.js";
import sendResponse from "../utils/ResponseHelper.js";
import config from "../config/CapstoneConfig.js";
import { ApiError } from "../utils/ApiError.js";

const retrieveProfile = async (req, res, next) => {
  try {
    const user = await getUserByEmail(req.user.userId);

    sendResponse(
      httpStatus.OK,
      "Success",
      { ...user.dataValues, password: undefined }, //hidden password
      res
    );
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { ...newUserInfo } = req.body;
    const user = await updateUser(
      await getUserByEmail(req.user.userId),
      newUserInfo
    );
    sendResponse(
      httpStatus.OK,
      "User updated successfully",
      { ...user.dataValues, password: undefined },
      res
    );
  } catch (error) {
    next(error);
  }
};

const retrieveImagesBU = async (req, res, next) => {
  try {
    const { freeText, currentPage, itemPerPage } = req.query;
    const offset =
      currentPage === undefined ? 0 : parseInt(currentPage) - 1 || 0;
    const limit = parseInt(itemPerPage) || config.pagination.pageSize;
    const user = await getUserByEmail(req.user.userId);
    let result;
    if (freeText === undefined || freeText.trim() === "") {
      result = await fetchImagesBU(user, {
        offset,
        limit,
      });
    } else {
      result = await searchImagesBU(user, freeText, {
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
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

const retrieveImageBU = async (req, res, next) => {
  try {
    const image = await fetchImageBU(
      await getUserByEmail(req.user.userId),
      req.params.imageId
    );

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

const retrieveImageBookmarksBU = async (req, res, next) => {
  try {
    const { freeText, currentPage, itemPerPage } = req.query;
    const offset =
      currentPage === undefined ? 0 : parseInt(currentPage) - 1 || 0;
    const limit = parseInt(itemPerPage) || config.pagination.pageSize;
    const user = await getUserByEmail(req.user.userId);

    let result;
    if (freeText === undefined || freeText.trim() === "") {
      result = await fetchImageBookmarksBU(user, {
        offset,
        limit,
      });
    } else {
      result = await searchImageBookmarksBU(user, freeText, {
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
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

const deleteImageBU = async (req, res, next) => {
  try {
    const image = await destroyImageBU(
      await getUserByEmail(req.user.userId),
      req.params.imageId
    );

    if (!image) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `The image: ${req.params.imageId} is not exist`
      );
    }

    try {
      const filePath = path.join(process.cwd(), "public", image.path);
      await deleteFileIfExists(filePath);
    } catch (error) {
      //do nothing
    }
    sendResponse(httpStatus.OK, "Image was deleted successfully", null, res);
  } catch (error) {
    next(error);
  }
};

const deleteFileIfExists = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        reject(new ApiError(httpStatus.BAD_REQUEST, "File does not exist"));
      } else {
        fs.unlink(filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
};

export {
  retrieveProfile,
  updateProfile,
  retrieveImagesBU,
  retrieveImageBU,
  retrieveImageBookmarksBU,
  deleteImageBU,
};
