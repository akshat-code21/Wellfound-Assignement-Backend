import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema, type: 'body' | 'params' | 'query' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    let validationObject;
    
    switch(type) {
      case 'body':
        validationObject = req.body;
        break;
      case 'params':
        validationObject = req.params;
        break;
      case 'query':
        validationObject = req.query;
        break;
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
