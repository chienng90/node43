// src/models/Database.js
import { Sequelize } from "sequelize";
import config from "../config/CapstoneConfig.js";
class Database {
  #sequelize;

  constructor() {
    const { name, user, password, host, port, dialect } = config.getDbConfig();

    this.#sequelize = new Sequelize(name, user, password, {
      host,
      port,
      dialect,
    });
  }

  getConnection() {
    return this.#sequelize;
  }
}

// Create an instance of the Database class and export it
const database = new Database();
export default database.getConnection();
