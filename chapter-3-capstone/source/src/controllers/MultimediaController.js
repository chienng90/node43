import httpStatus from "http-status";
import sendResponse from "../utils/ResponseHelper.js";
import fs from "fs";
import path from "path";
import { ApiError } from "../utils/ApiError.js";

const uploadImage = (req, res, next) => {
  try {
    const { mimetype, filename, size, originalname } = req.file;

    sendResponse(
      httpStatus.OK,
      "success",
      { mimetype, path: filename, size, originalname },
      res
    );
  } catch (error) {
    next(error);
  }
};

const deletePhysicalImage = async (req, res, next) => {
  try {
    const filePath = path.join(process.cwd(), "public", req.params.fileName);
    await deleteFileIfExists(filePath);
    res.send("File deleted successfully");
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

export { uploadImage, deletePhysicalImage };
