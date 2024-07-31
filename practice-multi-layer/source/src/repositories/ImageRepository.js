import config from "../config/CapstoneConfig.js";
import connect from "../models/Database.js";
import initModels from "../models/init-models.js";

class ImageRepository {
  constructor(models) {
    this.models = models;
  }

  async retrieveImages(pagination) {
    const { offset = 0, limit = config.getPaginationConfig().pageSize } =
      pagination;
    const images = await this.models.image.findAll({
      offset: parseInt(offset, 10),
      limit: parseInt(limit, 10),
    });

    const total = await this.models.image.count();
    return {
      data: images,
      pagination: {
        items: total,
        pages: Math.ceil(total / limit),
        offset: parseInt(offset, 10),
        limit: parseInt(limit, 10),
      },
    };
  }

  async fetchUserImages(user, pagination) {
    const { offset = 0, limit = config.getPaginationConfig().pageSize } =
      pagination;
    const images = await this.models.image.findAll({
      offset: parseInt(offset, 10),
      limit: parseInt(limit, 10),
      where: {
        user_id: user.user_id,
      },
    });

    const total = await this.models.image.count({
      where: {
        user_id: user.user_id,
      },
    });
    return {
      data: images,
      pagination: {
        items: total,
        pages: Math.ceil(total / limit),
        offset: parseInt(offset, 10),
        limit: parseInt(limit, 10),
      },
    };
  }

  async freeTextSearch(freeText, pagination) {
    const { offset = 0, limit = config.getPaginationConfig().pageSize } =
      pagination;

    // Query to fetch search results with relevance
    const imagesQuery = `
      SELECT *,
             MATCH(name) AGAINST(:freeText IN BOOLEAN MODE) AS relevance
      FROM image
      WHERE MATCH(name) AGAINST(:freeText IN BOOLEAN MODE)
      ORDER BY relevance DESC
      LIMIT :limit OFFSET :offset;
    `;

    // Query to count total number of items matching the search criteria
    const totalItemsQuery = `
      SELECT COUNT(*) as totalItems
      FROM image
      WHERE MATCH(name) AGAINST(:freeText IN BOOLEAN MODE);
    `;

    // Execute the queries
    const images = await this.models.sequelize.query(imagesQuery, {
      replacements: {
        freeText,
        offset: parseInt(offset, 10),
        limit: parseInt(limit, 10),
      },
      type: this.models.sequelize.QueryTypes.SELECT,
    });

    const [totalItemsResult] = await this.models.sequelize.query(
      totalItemsQuery,
      {
        replacements: { freeText },
        type: this.models.sequelize.QueryTypes.SELECT,
      }
    );

    const totalItems = totalItemsResult.totalItems;

    return {
      data: images,
      pagination: {
        items: totalItems,
        pages: Math.ceil(totalItems / limit),
        offset,
        limit,
      },
      freeText,
    };
  }

  async getImageById(id) {
    return await this.models.image.findByPk(id);
  }

  async getImage(userId, imageId) {
    return await this.models.image.findOne({
      where: { id: imageId, user_id: userId },
    });
  }

  async getGallery(user, imageId) {
    return await this.models.user_gallery.findAll({
      where: { user_id: user.user_id, image_id: imageId },
      limit: 10, // just get the first 10 items
    });
  }

  async createImage(image) {
    return this.models.sequelize.transaction(async (trans) => {
      return await this.models.image.create(
        {
          ...image,
        },
        { trans }
      );
    });
  }

  async createGallery(galleryInfo) {
    return this.models.sequelize.transaction(async (trans) => {
      return await this.models.user_gallery.create(
        {
          ...galleryInfo,
        },
        { trans }
      );
    });
  }

  async deleteImage(userId, imageId) {
    await this.models.image.destroy({
      where: { id: imageId, user_id: userId },
    });
  }
}

// Export an instance of the ImageRepository class with initialized models (database connection)
const imageRepository = new ImageRepository(initModels(connect));

export default imageRepository;
