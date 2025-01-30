import winston, { format } from "winston";

export const logFormat = (params: Record<string, any>) => {
  const { level, message, metadata } = params;
  const { timestamp, context } = metadata || {};

  return `${level} ${timestamp} ${context || ""}:: ${message}`;
};

const logger = winston.createLogger({
  format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), format.metadata(), format.prettyPrint()),
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.printf(logFormat)),
      level: "debug",
    }),
  ],
  silent: process.env.NODE_ENV === "test",
});

const createLogger = (context: string) => {
  const childLogger = logger.child({ context });
  const newLogger = (message: string) => childLogger.info(message);
  newLogger.info = (message: string) => childLogger.info(message);
  newLogger.warn = (message: string) => childLogger.warn(message);
  newLogger.error = (message: string) => childLogger.error(message);
  return newLogger;
};

// Object having write function for callback with morgan.
export const writeStream = {
  write(message: string) {
    logger.info(message);
  },
};

export default createLogger;
