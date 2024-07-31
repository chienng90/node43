import cloudinary from "cloudinary";
import config from "../config/CapstoneConfig.js";
import logger from "../config/Logger.js";
import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";

class CloudinaryService {
  constructor(cloudinaryInstance) {
    this.cloudinary = cloudinaryInstance;
  }

  /**
   * Upload an image to Cloudinary.
   * @param {string} base64Image - The base64 encoded image data.
   * @param {Object} options - Additional upload options (optional).
   * @returns {Promise<Object>} The result of the upload, including public_id and URL.
   */
  async upload(base64Image, options = {}) {
    try {
      const result = await this.cloudinary.uploader.upload(
        base64Image,
        options
      );
      return result;
    } catch (error) {
      logger.error("Error uploading to Cloudinary");
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Upload to Cloudinary failed."
      );
    }
  }

  /**
   * Delete an image from Cloudinary.
   * @param {string} publicId - The public ID of the image to delete.
   */
  async destroy(publicId) {
    try {
      await this.cloudinary.uploader.destroy(publicId);
    } catch (error) {
      logger.error("Error deleting from Cloudinary");
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Delete from Cloudinary failed."
      );
    }
  }
}

const cloudinaryInstance = cloudinary.v2.config({
  ...config.getCloudinaryConfig(),
});

// Export an instance of the CloudinaryService
export default new CloudinaryService(cloudinaryInstance);
