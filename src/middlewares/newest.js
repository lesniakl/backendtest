import Joi from "joi";
// const { object, string } = pkg;
import { validationRequest } from "../helpers/validation.js";
import { CATEGORIES } from "../helpers/variables.js";
import { RequestFieldType } from "../types/requestFieldType.js";

const newestSchema = Joi.object({
  categories: Joi.string()
    .regex(
      new RegExp(`^(${CATEGORIES.join("|")})(,(${CATEGORIES.join("|")}))*$`)
    )
    .message("Invalid type of category"),
});

export const newest = validationRequest(newestSchema, RequestFieldType.query);
