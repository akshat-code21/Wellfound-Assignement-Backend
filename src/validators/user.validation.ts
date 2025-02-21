import Joi from "joi";

export const userValidation = {
  createUser: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required().valid("admin", "user"),
  }),

  updateUser: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    role: Joi.string().valid("admin", "user"),
  }),

  idParam: Joi.object({
    id: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/),
  }),
  signup: Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
