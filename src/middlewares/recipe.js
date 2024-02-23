// import { object } from "joi";
// import pkg from "joi";
// const { object } = pkg;
import Joi from "joi";
import { RequestFieldType } from "../types/requestFieldType.js";
import { validationFields } from "../helpers/validation.js";
import { validationRequest } from "../helpers/validation.js";
import { validationRequestWithImg } from "../helpers/validation.js";

const { object } = Joi;
const recipeSchema = Joi.object({
  title: validationFields.title.required(),
  category: validationFields.category.required(),
  instructions: validationFields.instructions.required(),
  description: validationFields.description.required(),
  time: validationFields.time.required(),
  ingredients: validationFields.ingredients.required(),
});

const recipeIdSchema = Joi.object({
  recipeId: validationFields.id.required(),
});

const recipeCategoryNameSchema = Joi.object({
  categoryName: validationFields.category.required(),
});

export const recipe = validationRequestWithImg(
  recipeSchema,
  RequestFieldType.body
);
export const recipeId = validationRequest(
  recipeIdSchema,
  RequestFieldType.params
);
export const recipeCategoryName = validationRequest(
  recipeCategoryNameSchema,
  RequestFieldType.params
);
