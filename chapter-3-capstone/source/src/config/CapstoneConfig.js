class CapstoneConfig {
  #db;
  #server;
  #auth;
  #pagination;

  constructor() {
    this.#db = {
      name: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT, 10),
      dialect: process.env.DB_DIALECT,
    };

    this.#server = {
      port: parseInt(process.env.CAPSTONE_APP_SERVER_PORT, 10),
      contextPath: process.env.CAPSTONE_APP_CONTEXT_PATH,
      env: process.env.CAPSTONE_APP_ENV,
    };

    this.#auth = {
      salt: parseInt(process.env.CAPSTONE_APP_SALT, 10),
      secret: process.env.CAPSTONE_APP_JWT_SECRET,
      expiresIn: process.env.CAPSTONE_APP_JWT_EXPIRES_IN,
    };
    this.#pagination = {
      pageSize: parseInt(process.env.CAPSTONE_APP_PAGINATION_SIZE, 10),
    };
  }

  getDbConfig() {
    return { ...this.#db };
  }

  getServerConfig() {
    return { ...this.#server };
  }

  getAuthConfig() {
    return { ...this.#auth };
  }

  getPaginationConfig() {
    return { ...this.#pagination };
  }
}

// Export an instance of the Config class
const config = new CapstoneConfig();
export default config;
