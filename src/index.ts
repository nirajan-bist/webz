import app from "./app";

import createLogger from "Utils/logger";

const logger = createLogger("index");

const PORT = process.env.PORT || process.env.NODE_PORT;

// Listen to the port
app.listen(PORT, () => {
  logger.info(`Listening on port: ${PORT}`);
});
