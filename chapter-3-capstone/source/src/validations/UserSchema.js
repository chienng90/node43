import Joi from "joi";

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).optional(),
  password: Joi.string().min(6).required(),
}).unknown(true);

export { registerSchema };
