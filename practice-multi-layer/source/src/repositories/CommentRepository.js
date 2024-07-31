import config from "../config/CapstoneConfig.js";
import connect from "../models/Database.js";
import initModels from "../models/init-models.js";

class CommentRepository {
  constructor(models) {
    this.models = models;
  }

  async retrieveComments(userId, imageId, pagination = {}) {
    // Destructure and provide default values for offset and limit
    const { offset = 0, limit = config.getPaginationConfig().pageSize } =
      pagination;

    // Ensure offset and limit are integers
    const offsetInt = parseInt(offset, 10);
    const limitInt = parseInt(limit, 10);

    // Retrieve comments based on userId, imageId, and pagination
    const comments = await this.models.comment.findAll({
      offset: offsetInt,
      limit: limitInt,
      where: {
        user_id: userId,
        image_id: imageId,
      },
    });

    // Get the total count of comments for the given userId and imageId
    const total = await this.models.comment.count({
      where: {
        user_id: userId,
        image_id: imageId,
      },
    });

    // Return the comments and pagination information
    return {
      data: comments,
      pagination: {
        items: total,
        pages: Math.ceil(total / limitInt),
        offset: offsetInt,
        limit: limitInt,
      },
    };
  }

  async createComment(userId, imageId, comment) {
    return await this.models.sequelize.transction(async (trans) => {
      return await this.models.comment.create(
        {
          ...comment,
          user_id: userId,
          image_id: imageId,
        },
        { trans }
      );
    });
  }
}

// Export an instance of the CommentRepository class with initialized models (database connection)
const commentRepository = new CommentRepository(initModels(connect));

export default commentRepository;
