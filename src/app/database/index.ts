export { transaction, raw } from "objection";

import { knex } from "./knex";
export const db = knex;
