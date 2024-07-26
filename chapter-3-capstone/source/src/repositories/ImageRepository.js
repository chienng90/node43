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

  async freeTextSearch(freeText, pagination) {
    const { offset = 0, limit = config.getPaginationConfig().pageSize } =
      pagination;

    // Query to fetch search results
    const images = await this.models.sequelize.query(
      `SELECT * FROM image 
       WHERE MATCH(name) AGAINST(:freeText IN NATURAL LANGUAGE MODE)
       LIMIT :limit OFFSET :offset`,
      {
        replacements: {
          freeText,
          offset: parseInt(offset, 10),
          limit: parseInt(limit, 10),
        },
        type: this.models.sequelize.QueryTypes.SELECT,
      }
    );

    // Query to count total number of items
    const [totalItemsResult] = await this.models.sequelize.query(
      `SELECT COUNT(*) as totalItems FROM image 
       WHERE MATCH(name) AGAINST(:freeText IN NATURAL LANGUAGE MODE)`,
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
}

// Export an instance of the ImageRepository class with initialized models (database connection)
const imageRepository = new ImageRepository(initModels(connect));

export default imageRepository;
