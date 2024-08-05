import _sequelize from "sequelize";
const { Model } = _sequelize;

export default class comment extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "user",
            key: "id",
          },
        },
        image_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "image",
            key: "id",
          },
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        content: {
          type: DataTypes.STRING(5000),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "comment",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "user_id",
            using: "BTREE",
            fields: [{ name: "user_id" }],
          },
          {
            name: "image_id",
            using: "BTREE",
            fields: [{ name: "image_id" }],
          },
        ],
      }
    );
  }
}
