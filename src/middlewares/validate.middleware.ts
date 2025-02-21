import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validationObject = {};

    if (Object.keys(req.body).length) {
      Object.assign(validationObject, req.body);
    }
    if (Object.keys(req.params).length) {
      Object.assign(validationObject, req.params);
    }
    if (Object.keys(req.query).length) {
      Object.assign(validationObject, req.query);
    }

    const { error } = schema.validate(validationObject, { abortEarly: false });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");

      res.status(400).json({
        message: "Validation error",
        errors: errorMessage,
      });
      return;
    }

    next();
  };
};
