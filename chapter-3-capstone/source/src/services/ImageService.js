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
      result = await this.#imageRepository.freeTextSearch(freeText, {
        offset: currentPage - 1,
        limit: itemPerPage,
      });
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
    } else {
      return result;
    }
  }
}

// Export an instance of the ImageService class
const imageService = new ImageService(imageRepository);
export { imageService };
