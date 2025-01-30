import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import validate from "../utils/validate";

const userSchema = Joi.object({
  email: Joi.string().max(100).email().label("Email").required(),
  password: Joi.string().min(3).max(30).label("Password").required(),
  username: Joi.string().max(100).label("Username").required(),
  fullName: Joi.string().label("Full Name").required(),
  department: Joi.string().label("Department").required(),
  role: Joi.string().label("Role").required(),
  designation: Joi.string().label("Designation").required(),
  contact: Joi.string().label("Contact").required(),
  country: Joi.string().label("Country").required(),
});

const createUsersSchema = Joi.array().items(userSchema).min(1);

const updateUserSchema = Joi.object({
  id: Joi.number().label("Id").required(),
  email: Joi.string().max(100).email().label("Email"),
  password: Joi.string().min(3).max(30).label("Password"),
  username: Joi.string().max(100).label("Username"),
  fullName: Joi.string().label("Full Name"),
  department: Joi.string().label("Department"),
  role: Joi.string().label("Role"),
  designation: Joi.string().label("Designation"),
  contact: Joi.string().label("Contact"),
  country: Joi.string().label("Country"),
  managerUsername: Joi.string().label("Manager Username"),
});

const deleteUsersSchema = Joi.object({
  userIds: Joi.array().items(Joi.number().integer()).min(1).required(),
});

/**
 * Validates request body for creating new users.
 */
export function validateCreateUsers(req: Request, res: Response, next: NextFunction) {
  return validate(req.body, createUsersSchema)
    .then(() => next())
    .catch(next);
}

/**
 * Validates request body for updating a user.
 */
export function validateUpdateUser(req: Request, res: Response, next: NextFunction) {
  return validate(req.body, updateUserSchema)
    .then(() => next())
    .catch(next);
}

/**
 * Validates request body for deleting users.
 */
export function validateDeleteUsers(req: Request, res: Response, next: NextFunction) {
  return validate(req.body, deleteUsersSchema)
    .then(() => next())
    .catch(next);
}
