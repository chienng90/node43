class CapstoneConfig {
  #db;
  #server;
  #auth;
  #pagination;
  #upload;
  #cloudinary;

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
    this.#upload = {
      defaultAllowExtensions:
        process.env.CAPSTONE_APP_UPLOAD_DEFAULT_ALLOW_EXTS.split(",").map(
          (type) => type.trim()
        ),
    };
    this.#cloudinary = {
      cloud_name: process.env.CAPSTONE_APP_CLOUDINARY_NAME,
      api_key: process.env.CAPSTONE_APP_CLOUDINARY_API_KEY,
      api_secret: process.env.CAPSTONE_APP_CLOUDINARY_API_SECRET,
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

  getUploadConfig() {
    return { ...this.#upload };
  }
  getCloudinaryConfig() {
    return { ...this.#cloudinary };
  }
}

// Export an instance of the Config class
const config = new CapstoneConfig();
export default config;
