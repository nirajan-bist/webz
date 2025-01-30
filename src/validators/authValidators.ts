import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import validate from "../utils/validate";

const signInSchema = Joi.object({
  email: Joi.string().max(100).email().label("Email").required(),
  password: Joi.string().min(3).max(30).label("Password").required(),
});

const signUpSchema = signInSchema.keys({
  fullname: Joi.string().max(100).label("Full Name").required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

/**
 * Validates sign in request body.
 */
export function validateSignIn(req: Request, res: Response, next: NextFunction) {
  return validate(req.body, signInSchema)
    .then(() => next())
    .catch(next);
}
/**
 * Validates sign up request body.
 */
export function validateSignUp(req: Request, res: Response, next: NextFunction) {
  return validate(req.body, signUpSchema)
    .then(() => next())
    .catch(next);
}
/**
 * Validates refresh token request body.
 */
export function validateRefreshToken(req: Request, res: Response, next: NextFunction) {
  return validate(req.body, refreshTokenSchema)
    .then(() => next())
    .catch(next);
}
