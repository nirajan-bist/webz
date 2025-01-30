import dotenv from "dotenv";
import { types } from "pg";

dotenv.config({ path: `${__dirname}/../.env` });

const { setTypeParser, builtins } = types;

// Resloves problem of getting timestamp instead of date in date fields.
setTypeParser(builtins.DATE, (val: Date) => val);

const env = process.env.NODE_ENV || "development";

const connectionFactory = {
  dev: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  test: {
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
  },
};

const dbConfig = {
  connection: process.env.DB_CONNECTION || connectionFactory[env],
  client: process.env.DB_CLIENT,
  migrations: { directory: "./changelogs/migrations", stub: "./changelogs/stubs/migration.stub" },
  seeds: { directory: "./changelogs/seeds", stub: "./changelogs/stubs/seed.stub" },
};

export default dbConfig;
