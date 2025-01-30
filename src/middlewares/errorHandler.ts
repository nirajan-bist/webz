import { Request, Response, NextFunction } from "express";

import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import ValidationError from "../errors/ValidationError";
import createLogger from "../utils/logger";

const logger = createLogger("Error handler");

export default function (err: any, req: Request, res: Response, next: NextFunction) {
  if (err.isJoi) {
    return res.status(400).json(new ValidationError(err.message).toResponseObject());
  }
  if (err.isCustom) {
    return res.status(err.code).json(err.toResponseObject());
  }
  if (err.name === "ROUTE_NOT_FOUND") {
    //Route not found
    logger.warn(`${req.path} path is not available!`);
    const error = new NotFound("Route not found!");
    return res.status(error.code).json(error.toResponseObject());
  }

  //Server Error
  logger.error(err.stack);

  const error = new ServerError("Server Error Occured!", err.stack);

  res.status(error.code).send(error.toResponseObject());
}
