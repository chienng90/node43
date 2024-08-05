import connect from "../models/Connect.js";
import initModels from "../models/init-models.js";
import user from "../models/user.js";

const models = initModels(connect);

const searchImages = async (freeText, pagination) => {
  const { offset, limit } = pagination;
  const freeTextSearch = freeText
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word + "*")
    .join(" ");

  // Query to fetch search results with relevance and user info
  const imagesQuery = `
      SELECT i.*,
             MATCH(i.name) AGAINST(:freeTextSearch IN BOOLEAN MODE) AS relevance,
             u.fullname, u.email, u.age, u.avatar
      FROM image i
      LEFT JOIN user u ON i.user_id = u.id
      WHERE MATCH(i.name) AGAINST(:freeTextSearch IN BOOLEAN MODE)
      ORDER BY relevance DESC
      LIMIT :limit OFFSET :offset;
    `;

  // Query to count total number of items matching the search criteria
  const totalItemsQuery = `
      SELECT COUNT(*) as totalItems
      FROM image
      WHERE MATCH(name) AGAINST(:freeTextSearch IN BOOLEAN MODE);
    `;

  // Execute the queries
  const result = await models.sequelize.query(imagesQuery, {
    replacements: {
      freeTextSearch,
      offset,
      limit,
    },
    type: models.sequelize.QueryTypes.SELECT,
  });

  const [totalItemsResult] = await models.sequelize.query(totalItemsQuery, {
    replacements: { freeTextSearch },
    type: models.sequelize.QueryTypes.SELECT,
  });

  const totalItems = totalItemsResult.totalItems;

  // Restructure the results to separate user info
  const formattedImages = result.map((item) => ({
    ...item,
    user: {
      id: item.user_id,
      fullname: item.fullname,
      email: item.email,
      age: item.age,
      avatar: item.avatar,
    },
    user_id: undefined,
    fullname: undefined,
    email: undefined,
    age: undefined,
    avatar: undefined,
    relevance: undefined,
  }));

  return {
    data: formattedImages,
    pagination: {
      items: totalItems,
      pages: Math.ceil(totalItems / limit),
      offset,
      limit,
    },
    freeText,
  };
};

const fetchImages = async (pagination) => {
  const { offset, limit } = pagination;
  const images = await models.image.findAll({
    offset,
    limit,
    attributes: ["id", "name", "path", "desc"],
    include: [
      {
        model: models.user,
        as: "user",
        attributes: ["id", "fullname", "email", "age", "avatar"],
      },
    ],
  });

  const total = await models.image.count();
  return {
    data: images,
    pagination: {
      items: total,
      pages: Math.ceil(total / limit),
      offset,
      limit,
    },
  };
};

const getImage = async (id) => {
  return await models.image.findOne({
    where: { id },
    attributes: ["id", "name", "path", "desc"],
    include: [
      {
        model: models.user,
        as: "user",
        attributes: ["id", "fullname", "email", "age", "avatar"],
      },
    ],
  });
};

const createImage = async (user, name, path, desc) => {
  return await models.sequelize.transaction(async (trans) => {
    return await models.image.create(
      {
        user_id: user.id,
        name,
        path,
        desc,
      },
      { trans }
    );
  });
};

export { searchImages, fetchImages, getImage, createImage };
