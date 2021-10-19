import Knex from "knex";

import { env } from "../helpers";

const DATABASE_HOST = env.get("DATABASE_HOST");
const DATABASE_NAME = env.get("DATABASE_NAME");
const DATABASE_USERNAME = env.get("DATABASE_USERNAME");
const DATABASE_PASSWORD = env.get("DATABASE_PASSWORD");
const DATABASE_DIALECT = env.get("DATABASE_DIALECT");
const DATABASE_PORT = parseInt(env.get("DATABASE_PORT"));
const DATABASE_CONN_MAX = parseInt(env.get("DATABASE_CONN_MAX"));
const DATABASE_CONN_MIN = parseInt(env.get("DATABASE_CONN_MIN"));
const DATABASE_TIMEZONE = env.get("DATABASE_TIMEZONE");

export const knex = Knex({
  client: DATABASE_DIALECT,
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    timezone: DATABASE_TIMEZONE,
  },
  debug: env.get("KNEX_DEBUG") == "true",
  pool: { min: DATABASE_CONN_MIN, max: DATABASE_CONN_MAX },
});
