import { env } from "./src/app/helpers";

const DATABASE_HOST = env.get("DATABASE_HOST");
const DATABASE_NAME = env.get("DATABASE_NAME");
const DATABASE_USERNAME = env.get("DATABASE_USERNAME");
const DATABASE_PASSWORD = env.get("DATABASE_PASSWORD");
const DATABASE_DIALECT = env.get("DATABASE_DIALECT");
const DATABASE_PORT = parseInt(env.get("DATABASE_PORT"));
const DATABASE_CONN_MAX = parseInt(env.get("DATABASE_CONN_MAX"));
const DATABASE_CONN_MIN = parseInt(env.get("DATABASE_CONN_MIN"));

const connectionProperties = {
  client: DATABASE_DIALECT,
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  },
  pool: {
    min: DATABASE_CONN_MIN,
    max: DATABASE_CONN_MAX,
  },
  migrations: {
    tableName: "migrations",
    directory: "./src/app/database/migrations",
  },
  seeds: {
    directory: "./src/app/database/seeds",
  },
};

module.exports = {
  development: {
    ...connectionProperties,
  },

  staging: {
    ...connectionProperties,
  },

  production: {
    ...connectionProperties,
  },
};
