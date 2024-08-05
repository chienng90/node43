const config = {
  db: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,
  },
  server: {
    port: parseInt(process.env.CAPSTONE_APP_SERVER_PORT),
    contextPath: process.env.CAPSTONE_APP_CONTEXT_PATH,
    env: process.env.CAPSTONE_APP_ENV,
  },
  auth: {
    salt: parseInt(process.env.CAPSTONE_APP_SALT),
    secret: process.env.CAPSTONE_APP_JWT_SECRET,
    expiresIn: process.env.CAPSTONE_APP_JWT_EXPIRES_IN,
  },
  pagination: {
    pageSize: parseInt(process.env.CAPSTONE_APP_PAGINATION_SIZE),
  },
  upload: {
    defaultAllowExtensions: process.env.CAPSTONE_APP_UPLOAD_DEFAULT_ALLOW_EXTS,
  },
};

export default config;
