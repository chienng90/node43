import Joi from "joi";

const commentSchema = Joi.object({
  content: Joi.string().min(1).max(5000).required(),
}).unknown(true);

export { commentSchema };
