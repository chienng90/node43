import express from "express";
import catchAsync from "../utils/asyncHandler.js";
import {
  bookmarkImage,
  retrieveImageBookmark,
  retrieveImageBookmarks,
} from "../controllers/BookmarkController.js";

const bookmarkRouter = express.Router();

bookmarkRouter.get("/bookmarks", catchAsync(retrieveImageBookmarks));
bookmarkRouter.post("/bookmarks/:imageId", catchAsync(bookmarkImage));
bookmarkRouter.get("/bookmarks/:imageId", catchAsync(retrieveImageBookmark));

export default bookmarkRouter;
