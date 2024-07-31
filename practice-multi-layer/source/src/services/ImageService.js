import httpStatus from "http-status";
import imageRepository from "../repositories/ImageRepository.js";
import { ApiError } from "../utils/ApiError.js";

class ImageService {
  #imageRepository;

  constructor(imageRepository) {
    this.#imageRepository = imageRepository;
  }

  async freeTextSearch(freeText, currentPage, itemPerPage) {
    let result;
    if (freeText === undefined || freeText.trim() === "") {
      result = await this.#imageRepository.retrieveImages({
        offset: currentPage - 1,
        limit: itemPerPage,
      });
    } else {
      result = await this.#imageRepository.freeTextSearch(
        this.#appendAsteriskToWords(freeText),
        {
          offset: currentPage - 1,
          limit: itemPerPage,
        }
      );
    }

    return {
      data: [...result.data],
      pagination: {
        items: result.pagination.items,
        pages: result.pagination.pages,
        currentPage: result.pagination.offset + 1,
        itemPerPage: result.pagination.limit,
      },
      freeText,
    };
  }

  async retrieveImage(id) {
    const result = await this.#imageRepository.getImageById(id);

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }

    return result;
  }

  async existImageInGallery(user, imageId) {
    try {
      return !!(await this.#imageRepository.getGallery(user, imageId));
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed: ${error.message}`);
    }
  }

  async fetchUserImages(user, currentPage, itemPerPage) {
    const result = await this.#imageRepository.fetchUserImages(user, {
      offset: currentPage - 1,
      limit: itemPerPage,
    });

    return {
      data: [...result.data],
      pagination: {
        items: result.pagination.items,
        pages: result.pagination.pages,
        currentPage: result.pagination.offset + 1,
        itemPerPage: result.pagination.limit,
      },
    };
  }

  async createImage(name, path, desc, userId, publicId) {
    return this.#imageRepository.createImage({
      name,
      path,
      desc,
      user_id: userId,
      public_id: publicId,
    });
  }

  async addGallery(userId, imageId) {
    return this.#imageRepository.createGallery({
      user_id: userId,
      image_id: imageId,
      date: new Date(),
    });
  }

  async deleteImage(user, imageId) {
    const image = await this.#imageRepository.getImage(user.user_id, imageId);
    if (!image) {
      throw ApiError(httpStatus.BAD_REQUEST, "Image not found.", null, res);
    }

    // Delete image from Cloudinary

    // Delete image record from the database
    await this.#imageRepository.deleteImage(user.user_id, imageId);
  }

  #appendAsteriskToWords(input) {
    // Initialize variables
    let result = "";
    let isWord = false;

    for (const char of input) {
      if (char === " ") {
        if (isWord) {
          // End of a word, append an asterisk and a space
          result += "* ";
          isWord = false;
        } else {
          // Multiple spaces, just skip them
          continue;
        }
      } else {
        // Add character to the result
        result += char;
        isWord = true;
      }
    }

    // Append asterisk for the last word if it exists
    if (isWord) {
      result += "*";
    }

    return result;
  }
}

// Export an instance of the ImageService class
const imageService = new ImageService(imageRepository);
export { imageService };
