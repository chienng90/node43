import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _comment from "./comment.js";
import _image from "./image.js";
import _user from "./user.js";
import _user_gallery from "./user_gallery.js";

export default function initModels(sequelize) {
  const comment = _comment.init(sequelize, DataTypes);
  const image = _image.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);
  const user_gallery = _user_gallery.init(sequelize, DataTypes);

  image.belongsToMany(user, {
    as: "user_id_users",
    through: user_gallery,
    foreignKey: "image_id",
    otherKey: "user_id",
  });
  user.belongsToMany(image, {
    as: "image_id_images",
    through: user_gallery,
    foreignKey: "user_id",
    otherKey: "image_id",
  });
  comment.belongsTo(image, { as: "image", foreignKey: "image_id" });
  image.hasMany(comment, { as: "comments", foreignKey: "image_id" });
  user_gallery.belongsTo(image, { as: "image", foreignKey: "image_id" });
  image.hasMany(user_gallery, { as: "user_galleries", foreignKey: "image_id" });
  comment.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(comment, { as: "comments", foreignKey: "user_id" });
  image.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(image, { as: "images", foreignKey: "user_id" });
  user_gallery.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(user_gallery, { as: "user_galleries", foreignKey: "user_id" });

  return {
    comment,
    image,
    user,
    user_gallery,
    sequelize,
  };
}
