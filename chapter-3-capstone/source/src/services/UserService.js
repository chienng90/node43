import httpStatus from "http-status";
import initModels from "../models/init-models.js";
import connect from "../models/Connect.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import config from "../config/CapstoneConfig.js";
import jwt from "jsonwebtoken";

const models = initModels(connect);

const createUser = async (fullname, email, age, password) => {
  if (!!(await getUserByEmail(email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  return await models.sequelize.transaction(async (trans) => {
    return await models.user.create(
      {
        fullname,
        email,
        age: parseInt(age),
        password: bcrypt.hashSync(password, config.auth.salt),
      },
      { trans }
    );
  });
};

const generateToken = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, "Email is incorrect");
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password is incorrect");
  }

  return jwt.sign({ userId: user.email }, config.auth.secret, {
    expiresIn: config.auth.expiresIn,
  });
};

const getUserByEmail = async (email) => {
  return await models.user.findOne({ where: { email } });
};

const updateUser = async (user, newUserInfo) => {
  // Bind allowed attributes to the user model
  const allowedAttributes = ["fullname", "age", "avatar"];
  bindUserAttributes(user, newUserInfo, allowedAttributes);

  return await models.sequelize.transaction(async (trans) => {
    return await user.save({ trans });
  });
};

const bindUserAttributes = (user, requestBody, allowedAttributes) => {
  allowedAttributes.forEach((attr) => {
    if (requestBody[attr] !== undefined) {
      user[attr] = requestBody[attr];
    }
  });
};

const searchImagesBU = async (user, freeText, pagination) => {
  const { offset, limit } = pagination;
  const freeTextSearch = freeText
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word + "*")
    .join(" ");

  // Query to fetch search results with relevance
  const imagesQuery = `
      SELECT *,
             MATCH(name) AGAINST(:freeTextSearch IN BOOLEAN MODE) AS relevance
      FROM image
      WHERE user_id = :userId AND MATCH(name) AGAINST(:freeTextSearch IN BOOLEAN MODE)
      ORDER BY relevance DESC
      LIMIT :limit OFFSET :offset;
    `;

  // Query to count total number of items matching the search criteria
  const totalItemsQuery = `
      SELECT COUNT(*) as totalItems
      FROM image
      WHERE user_id = :userId AND MATCH(name) AGAINST(:freeTextSearch IN BOOLEAN MODE);
    `;

  // Execute the queries
  const images = await models.sequelize.query(imagesQuery, {
    replacements: {
      freeTextSearch,
      offset,
      limit,
      userId: user.id,
    },
    type: models.sequelize.QueryTypes.SELECT,
  });

  const [totalItemsResult] = await models.sequelize.query(totalItemsQuery, {
    replacements: { freeTextSearch, userId: user.id },
    type: models.sequelize.QueryTypes.SELECT,
  });

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
};

const fetchImagesBU = async (user, pagination) => {
  const { offset, limit } = pagination;
  const images = await models.image.findAll({
    offset,
    limit,
    where: {
      user_id: user.id,
    },
  });

  const total = await models.image.count({ where: { user_id: user.id } });
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

const fetchImageBU = async (user, imageId) => {
  return await models.image.findOne({
    where: { user_id: user.id, id: imageId },
  });
};

const fetchImageBookmarksBU = async (user, pagination) => {
  const { offset, limit } = pagination;

  // Fetch paginated data
  const result = await models.bookmark.findAll({
    offset,
    limit,
    attributes: ["date"],
    include: [
      {
        model: models.user,
        as: "user",
        attributes: [], // No attributes from user model needed in the results
      },
      {
        model: models.image,
        as: "image",
        attributes: ["id", "name", "desc", "path"],
      },
    ],
    where: {
      user_id: user.id,
    },
  });

  // Count total number of records matching the same criteria
  const total = await models.bookmark.count({
    include: [
      {
        model: models.user,
        as: "user",
        attributes: [], // No attributes from user model needed for count
      },
      {
        model: models.image,
        as: "image",
        attributes: [], // No attributes from image model needed for count
      },
    ],
    where: {
      user_id: user.id,
    },
  });

  const customRespData = result
    ? result.map((item) => {
        return {
          id: item.image.id,
          name: item.image.name,
          path: item.image.path,
          desc: item.image.desc,
          date: item.date,
        };
      })
    : [];

  return {
    data: customRespData,
    pagination: {
      items: total,
      pages: Math.ceil(total / limit),
      offset,
      limit,
    },
  };
};

const searchImageBookmarksBU = async (user, freeText, pagination) => {
  const { offset, limit } = pagination;
  const freeTextSearch = freeText
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word + "*")
    .join(" ");

  // Query to fetch search results with relevance
  const imagesQuery = `
    SELECT img.id, img.name, img.path, img.desc, bm.date,
       MATCH(img.name) AGAINST(:freeTextSearch IN BOOLEAN MODE) AS relevance
        FROM image AS img
        JOIN bookmark AS bm ON bm.image_id = img.id
        JOIN user AS u ON bm.user_id = u.id
        WHERE bm.user_id = :userId
          AND MATCH(img.name) AGAINST(:freeTextSearch IN BOOLEAN MODE)
        ORDER BY relevance DESC
        LIMIT :limit OFFSET :offset;
  `;

  // Query to count total number of items matching the search criteria
  const totalItemsQuery = `
    SELECT COUNT(*) as totalItems
    FROM image AS img
        JOIN bookmark AS bm ON bm.image_id = img.id
        JOIN user AS u ON bm.user_id = u.id
        WHERE bm.user_id = :userId
          AND MATCH(img.name) AGAINST(:freeTextSearch IN BOOLEAN MODE);
  `;

  // Execute the queries
  const images = await models.sequelize.query(imagesQuery, {
    replacements: {
      freeTextSearch,
      offset,
      limit,
      userId: user.id,
    },
    type: models.sequelize.QueryTypes.SELECT,
  });

  const [totalItemsResult] = await models.sequelize.query(totalItemsQuery, {
    replacements: { freeTextSearch, userId: user.id },
    type: models.sequelize.QueryTypes.SELECT,
  });

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
};

const destroyImageBU = async (user, imageId) => {
  const transaction = await models.sequelize.transaction();

  try {
    await models.bookmark.destroy({
      where: { image_id: imageId },
      transaction,
    });

    await models.comment.destroy({
      where: { image_id: imageId },
      transaction,
    });

    const result = await models.image.destroy({
      where: { user_id: user.id, id: imageId },
      transaction,
    });

    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export {
  createUser,
  generateToken,
  getUserByEmail,
  updateUser,
  searchImagesBU,
  fetchImagesBU,
  fetchImageBU,
  fetchImageBookmarksBU,
  searchImageBookmarksBU,
  destroyImageBU,
};
