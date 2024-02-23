import Joi from "joi";
import { validationFields, validationRequest } from "../helpers/validation.js";
import { ValidationError } from "../helpers/errors.js";
import { RequestFieldType } from "../types/requestFieldType.js";

const editProfileSchema = Joi.object({
  name: validationFields.name.optional(),
});

const addSubscriptionSchema = Joi.object({
  email: validationFields.email.required(),
});

function isReqDataMissing(req, _res, next) {
  if (req.file?.fieldname !== "avatar" && !req.body?.name) {
    return next(new ValidationError("No data to update"));
  }
  next();
}

export const noData = isReqDataMissing;
export const edit = validationRequest(editProfileSchema, RequestFieldType.body);
export const subscribe = validationRequest(
  addSubscriptionSchema,
  RequestFieldType.body
);
