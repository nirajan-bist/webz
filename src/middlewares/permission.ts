import type { Request, Response, NextFunction } from "express";

import PermissionError from "../errors/PermissionError";

import { PERMISSION_MESSAGES } from "../constants";

import { store } from "Utils/store";
/**
 * Middleware: Verifies the user has sufficient permission.
 *
 * @param {String} permissionName The name of the permission to check for
 * @returns {Function} middleware
 */
export function checkPermissions(permissionName: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = store.get("user");

    if (user?.permissions[permissionName]) {
      next();
    } else {
      next(new PermissionError(PERMISSION_MESSAGES[permissionName]));
    }
  };
}

export default checkPermissions;
