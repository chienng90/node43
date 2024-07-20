import jwt from "jsonwebtoken";
import { resp } from "../config/resp.js";
import config from "../config/config.js";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
        return resp(null, "Access denied. No token provided.", 401, res);
    }

    try {
        const decoded = jwt.verify(token, config.auth.secret);
        req.user = decoded;
        next();
    } catch (error) {
        resp(null, "Invalid token.", 400, res);
    }

}

export default authMiddleware;