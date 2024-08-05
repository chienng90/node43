import Joi from "joi";
import config from "../config/CapstoneConfig.js";

const multimediaSchema = Joi.object({
  image: Joi.object({
    mimetype: Joi.string()
      .valid(config.upload.defaultAllowExtensions)
      .required(),
    size: Joi.number()
      .max(5 * 1024 * 1024)
      .required(), // Max size 5MB
  }).unknown(true),
}).unknown(true);

export { multimediaSchema };
