import Joi from "joi";

class UserSchema {
  static register = Joi.object({
    fullname: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
}

export default UserSchema;
