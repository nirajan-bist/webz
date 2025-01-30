import Joi from "joi";

import { Request, Response, NextFunction } from "express";

import validate from "../utils/validate";

const settingsUpdateSchema = Joi.object({
  key: Joi.string().required(),
  value: Joi.array().items(Joi.alternatives(Joi.string(), Joi.object())).min(1).required(),
});

/**
 * Validates request body for updating settings.
 */
export function validateUpdateSettings(req: Request, res: Response, next: NextFunction) {
  return validate(req.body, settingsUpdateSchema)
    .then(() => next())
    .catch(next);
}
