import connect from "../models/Connect.js";
import initModels from "../models/init-models.js";

const models = initModels(connect);

const fetchComments = async (imageId, pagination = {}) => {
  const { offset, limit } = pagination;
  const comments = await models.comment.findAll({
    offset,
    limit,
    where: {
      image_id: imageId,
    },
    attributes: ["id", "content", "date"],
    include: [
      {
        model: models.user,
        as: "user",
        attributes: ["id", "fullname", "email", "age", "avatar"],
      },
    ],
    order: [["date", "DESC"]],
  });

  const total = await models.comment.count({
    where: {
      image_id: imageId,
    },
  });
  return {
    data: comments,
    pagination: {
      items: total,
      pages: Math.ceil(total / limit),
      offset,
      limit,
    },
  };
};

const createComment = async (user, imageId, content) => {
  return await models.sequelize.transaction(async (trans) => {
    return await models.comment.create(
      {
        image_id: imageId,
        user_id: user.id,
        date: new Date(),
        content,
      },
      { trans }
    );
  });
};

export { fetchComments, createComment };
