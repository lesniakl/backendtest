import Joi from "joi";
import { validationFields } from "../helpers/validation.js";
import { validationRequest } from "../helpers/validation.js";
import { RequestFieldType } from "../types/requestFieldType.js";

const ShoppingListSchema = Joi.object({
  value: validationFields.value.required(),
  ingredientId: validationFields.id.required(),
  recipeId: validationFields.id.required(),
});

const deleteSchema = Joi.object({
  id: validationFields.id.required(),
});

export const add = validationRequest(ShoppingListSchema, RequestFieldType.body);
export const deleteValidator = validationRequest(
  deleteSchema,
  RequestFieldType.params
);
