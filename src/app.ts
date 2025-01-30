// Configure environment variables
import dotenv from "dotenv";
dotenv.config();

// Imports
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import { randomUUID } from "crypto";
import * as store from "@leapfrogtechnology/async-store";

import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

import createLogger, { writeStream } from "./utils/logger";

const logger = createLogger("index");

// Initialization
const app = express();

// Initialize async store
app.use(store.initializeMiddleware());

// Set request Id in store
app.use((req, res, next) => {
  store.set({ reqId: randomUUID() });
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny", { stream: writeStream }));

app.get("/api", (req: Request, res: Response) => {
  res.send("API version 1.0.0");
});

app.use("/v1", routes);

// Route not found middleware
app.use((_: Request, __: Response, next: NextFunction) => {
  next({ name: "ROUTE_NOT_FOUND" });
});

//Error handler middleware
app.use(errorHandler);

// Catch unhandled rejections
process.on("unhandledRejection", (err: any) => {
  logger.error("Unhandled rejection");
  logger.error(err.stack);

  process.exit(1);
});

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught exception");
  logger.error(err.stack);

  process.exit(1);
});

export default app;
