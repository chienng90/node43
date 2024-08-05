import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _bookmark from "./bookmark.js";
import _comment from "./comment.js";
import _image from "./image.js";
import _user from "./user.js";

export default function initModels(sequelize) {
  const bookmark = _bookmark.init(sequelize, DataTypes);
  const comment = _comment.init(sequelize, DataTypes);
  const image = _image.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  image.belongsToMany(user, {
    as: "user_id_users",
    through: bookmark,
    foreignKey: "image_id",
    otherKey: "user_id",
  });
  user.belongsToMany(image, {
    as: "image_id_images",
    through: bookmark,
    foreignKey: "user_id",
    otherKey: "image_id",
  });
  bookmark.belongsTo(image, { as: "image", foreignKey: "image_id" });
  image.hasMany(bookmark, { as: "bookmarks", foreignKey: "image_id" });
  comment.belongsTo(image, { as: "image", foreignKey: "image_id" });
  image.hasMany(comment, { as: "comments", foreignKey: "image_id" });
  bookmark.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(bookmark, { as: "bookmarks", foreignKey: "user_id" });
  comment.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(comment, { as: "comments", foreignKey: "user_id" });
  image.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(image, { as: "images", foreignKey: "user_id" });

  return {
    bookmark,
    comment,
    image,
    user,
    sequelize,
  };
}
