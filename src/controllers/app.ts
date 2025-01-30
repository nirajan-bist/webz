import { Request, Response, NextFunction } from "express";

import * as SettingServices from "../services/appServices";
import { getSuccessResponse } from "../utils/response";

export async function getSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await SettingServices.getSettings();
    return res.status(200).json(getSuccessResponse(data));
  } catch (err) {
    next(err);
  }
}

export async function updateSetting(req: Request, res: Response, next: NextFunction) {
  const payload = req.body;

  try {
    const data = await SettingServices.updateSetting(payload);

    return res.status(200).json(getSuccessResponse(data));
  } catch (err) {
    next(err);
  }
}
