import Joi from "joi";
import { validationFields, validationRequest } from "../helpers/validation.js";

const favoritesSchema = Joi.object({
  recipeId: validationFields.id.required(),
});

export function recipeId(type) {
  return validationRequest(favoritesSchema, type);
}
