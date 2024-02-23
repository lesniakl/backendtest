import Joi from "joi";
import { validationFields, validationRequest } from "../helpers/validation.js";
import { query } from "../types/requestFieldType.js";

const querySchema = Joi.object({
  value: validationFields.value.optional(),
});

export const getIngredients = validationRequest(querySchema, query);
