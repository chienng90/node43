import connect from "../models/Connect.js";
import initModels from "../models/init-models.js";

const models = initModels(connect);

const fetchImageBookmarks = async (user, pagination = {}) => {
  const { offset, limit } = pagination;
  const bookmarks = await models.bookmark.findAll({
    offset,
    limit,
    where: {
      user_id: user.id,
    },
  });

  const total = await models.comment.count({
    where: {
      user_id: user.id,
    },
  });
  return {
    data: bookmarks,
    pagination: {
      items: total,
      pages: Math.ceil(total / limit),
      offset,
      limit,
    },
  };
};

const createImageBookmark = async (user, imageId) => {
  return await models.sequelize.transaction(async (trans) => {
    return await models.bookmark.create(
      {
        image_id: imageId,
        user_id: user.id,
        date: new Date(),
      },
      { trans }
    );
  });
};

const fetchImageBookmark = async (user, imageId) => {
  return await models.bookmark.findOne({
    where: { user_id: user.id, image_id: imageId },
  });
};

export { fetchImageBookmarks, createImageBookmark, fetchImageBookmark };
