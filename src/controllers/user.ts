import { Request, Response, NextFunction } from "express";

import * as UserServices from "../services/userServices";
import { getSuccessResponse } from "../utils/response";

export async function createUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserServices.createUsers(req.body);

    return res.status(201).json(getSuccessResponse(data));
  } catch (err) {
    next(err);
  }
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserServices.getUsers();
    return res.status(200).json(getSuccessResponse(data));
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const payload = req.body;

  try {
    const data = await UserServices.updateUser(payload);

    return res.status(200).json(getSuccessResponse(data));
  } catch (err) {
    next(err);
  }
}

export async function deleteUsers(req: Request, res: Response, next: NextFunction) {
  const payload = req.body.userIds;

  try {
    const data = await UserServices.deleteUsers(payload);

    return res.status(200).json(getSuccessResponse(data));
  } catch (err) {
    next(err);
  }
}
