
import initModels from "../model/init-models.js";
import { resp } from "../config/resp.js";
import bcrypt from "bcrypt"
import config from "../config/config.js";
import jwt from "jsonwebtoken"
import connect from "../model/connect.js";

const models = initModels(connect);

const authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await models.user.findOne({ where: { email } });

        if (!user) {
            return resp(null, "Email is incorrect", 403, res);
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return resp(null, "Password is incorrect", 403, res);
        }

        const token = jwt.sign(
            { userId: user.email },
            config.auth.secret,
            { expiresIn: config.auth.expiresIn }
        );

        return resp({"token": token}, "Signed in successfully", 200, res);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const register = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        const existingUser = await models.user.findOne({ where: { email } });

        if (existingUser) {
            return resp(null, `The email: ${email} already exists!`, 409, res);
        }

        const hashedPassword = bcrypt.hashSync(password, config.auth.salt);
        const newUser = await models.user.create({
            full_name,
            email,
            password: hashedPassword
        });

        return resp(newUser, "User created successfully", 201, res);
    } catch (error) {
        return resp(null, `Registration failed: ${error.message}`, 500, res);
    }
};

export {
    authenticate,
    register
}