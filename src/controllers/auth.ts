import { TOKEN_TYPES } from "../constants";
import { invalidateToken } from "../models/token";
import { getPayloadFromToken } from "../utils/auth";
import { getSuccessResponse } from "../utils/response";

import { Request, Response, NextFunction } from "express";

import { signIn, signUp, generateNewAccessToken } from "../services/authServices";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await signIn(req.body);

    return res.status(200).json(getSuccessResponse(data));
  } catch (err) {
    next(err);
  }
}

export async function createNewUser(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await signUp(req.body);

    return res.status(200).json(getSuccessResponse(data));
  } catch (err) {
    next(err);
  }
}

export async function refreshTokens(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await generateNewAccessToken(req.body);
    return res.status(200).json(
      getSuccessResponse({
        accessToken: data,
      })
    );
  } catch (err) {
    next(err);
  }
}

export async function logOut(req: Request, res: Response, next: NextFunction) {
  try {
    const user = getPayloadFromToken(req.body.refreshToken, TOKEN_TYPES.REFRESH_TOKEN);
    await invalidateToken(user.id);
    return res.status(200).json(getSuccessResponse({ message: "Logged out successfully" }));
  } catch (err) {
    next(err);
  }
}
