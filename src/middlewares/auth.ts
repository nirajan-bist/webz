import { Response, NextFunction } from "express";
import TokenError from "../errors/TokenError";
import { isValidToken } from "../services/authServices";
import { store } from "Utils/store";
import { getPayloadFromToken } from "../utils/auth";

import { AuthenticatedRequest } from "Types/request";

/**
 * Middleware: Verifies the token and adds user field to the req object.
 * @returns
 */
export async function authenticateRequest(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization || "";

    if (!authorization) {
      return next(new TokenError("No Authorization Token"));
    }

    const [tokenTag, token = ""] = authorization.split(" ").filter(Boolean);

    if (tokenTag === "Bearer") {
      if (!token) {
        return next(new TokenError("No Authorization Token"));
      }

      const user = getPayloadFromToken(token);

      if (await isValidToken(user.id, token)) {
        store.set({ user });
        next();
      } else next(new TokenError("Token Expired!"));
    } else {
      next(new TokenError("No Authorization Token"));
    }
  } catch (error) {
    next(error);
  }
}

export default authenticateRequest;
