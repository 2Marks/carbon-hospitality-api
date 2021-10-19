/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const Knex = require('knex');

dotenv.config();

const get = name => process.env[name];

const DATABASE_HOST = get('DATABASE_HOST');
const DATABASE_NAME = get('DATABASE_NAME');
const DATABASE_USERNAME = get('DATABASE_USERNAME');
const DATABASE_PASSWORD = get('DATABASE_PASSWORD');
const DATABASE_DIALECT = get('DATABASE_DIALECT');
const DATABASE_PORT = parseInt(get('DATABASE_PORT'));
const DATABASE_CONN_MAX = parseInt(get('DATABASE_CONN_MAX'));
const DATABASE_CONN_MIN = parseInt(get('DATABASE_CONN_MIN'));
const DATABASE_TIMEZONE = get('DATABASE_TIMEZONE');

if (DATABASE_HOST === undefined || DATABASE_HOST == '') {
  throw new Error('Kindly ensure database config is specified in the env file');
}

const knex = Knex({
  client: DATABASE_DIALECT,
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    timezone: DATABASE_TIMEZONE,
  },
  debug: get('KNEX_DEBUG') == 'true',
  pool: { min: DATABASE_CONN_MIN, max: DATABASE_CONN_MAX },
});

exports.db = knex;
