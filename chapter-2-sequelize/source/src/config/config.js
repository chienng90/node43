export default {
    db : {
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT, 
        dialect: process.env.DB_DIALECT
    },
    server: {
        port: parseInt(process.env.FOOD_APP_SERVER_PORT, 3000),
        contextPath: process.env.FOOD_APP_CONTEXT_PATH
    }, 
    auth: {
        salt: parseInt(process.env.FOOD_APP_SALT, 10),
        secret: process.env.FOOD_APP_JWT_SECRET, 
        expiresIn: process.env.FOOD_APP_JWT_EXPIRES_IN
    }
}