import logger from "../config/Logger.js";
import connect from "../models/Database.js";
import initModels from "../models/init-models.js";

class UserRepository {
  constructor(models) {
    this.models = models;
  }

  async findUserByEmail(email) {
    try {
      return await this.models.user.findOne({ where: { email } });
    } catch (error) {
      logger.error("An error occurred:", {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async createUser(fullname, email, password) {
    try {
      return await this.models.user.create({ fullname, email, password });
    } catch (error) {
      logger.error("An error occurred:", {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}

// Export an instance of the UserRepository class with initialized models (database connection)
const userRepository = new UserRepository(initModels(connect));

export default userRepository;
