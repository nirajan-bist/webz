import { Request, Response, NextFunction } from "express";

import * as WebzServices from "../services/webzServices";
import { getSuccessResponse } from "../utils/response";

import createLogger from "Utils/logger";

const logger = createLogger("webz controller");

const defaultQuery = "ai replacing human workforce";

export async function fetchAndStoreData(req: Request, res: Response, next: NextFunction) {
  WebzServices.fetchAndSaveAll(defaultQuery, (savedCount, totalCountRemaining) => {
    logger.info(`Callback invoked: savedCount=${savedCount}, totalRemaining=${totalCountRemaining}`);
  })
    .then(() => {
      logger.info("Fetch process completed.");
      res.status(201).json(getSuccessResponse("Process completed successfully."));
    })
    .catch((err) => {
      logger.error(`Error in main process: ${(err as Error).message}`);
      next(err);
    });
}
