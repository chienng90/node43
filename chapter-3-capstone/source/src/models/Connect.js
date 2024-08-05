import { Sequelize } from "sequelize";
import config from "../config/CapstoneConfig.js";

const connect = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
  }
);

export default connect;
