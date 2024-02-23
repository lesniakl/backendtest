import Joi from "joi";
import { validationFields, validationRequest } from "../helpers/validation.js";
import { RequestFieldType } from "../types/requestFieldType.js";

const paginationSchema = Joi.object({
  page: validationFields.page.optional(),
  limit: validationFields.limit.optional(),
});

export const pagination = validationRequest(
  paginationSchema,
  RequestFieldType.query
);
