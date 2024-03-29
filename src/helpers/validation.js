import Joi from "joi";
import { isValidObjectId } from "mongoose";
import { RequestFieldType } from "../types/requestFieldType.js";
import { SearchType } from "../types/searchTypes.js";
import { ValidationError } from "./errors.js";
import { v2 } from "cloudinary";
import { CATEGORIES } from "./variables.js";

const idValidation = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('"id" should be of type "ObjectId"');
  }
  return value;
};

// Validation rules
const validationFields = {
  id: Joi.string().custom(idValidation, "Invalid id"),
  name: Joi.string().min(1).max(16),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .min(6)
    .max(16)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
    .messages({
      "string.min": "Must have at least 6 characters",
      "string.max": "Must be less then or equal 16 characters",
      "string.pattern.base":
        "At least one uppercase letter, one lowercase letter and one number",
    }),
  refreshToken: Joi.string(),
  title: Joi.string().min(3).max(30),
  category: Joi.string().equal(...Object.values(CATEGORIES)),
  instructions: Joi.string().min(10),
  description: Joi.string().min(8),
  time: Joi.string().min(1),
  ingredients: Joi.string(),
  // Search, ingredients
  type: Joi.string().equal(...Object.values(SearchType)),
  value: Joi.string().min(1).max(30),
  // ShoppingList
  ingredientId: Joi.string().custom(idValidation, "Invalid id"),
  // Pages
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
};

// Email validation for mongoose schema
export const isEmailValid = (email) =>
  !validationFields.email.validate(email).error;

// Request validation function
const validationRequest =
  (schema, type = RequestFieldType.body) =>
  (req, _res, next) => {
    const validationResult = schema.validate(req[type]);

    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }

    next();
  };

//Request validation function after upload image middleware
const validationRequestWithImg =
  (schema, type = RequestFieldType.body) =>
  (req, _res, next) => {
    const validationResult = schema.validate(req[type]);

    if (validationResult.error) {
      v2.uploader.destroy(req.file.filename, "image");
      throw new ValidationError(validationResult.error.message);
    }

    next();
  };

export {
  idValidation,
  validationFields,
  validationRequest,
  validationRequestWithImg,
};
