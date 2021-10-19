import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("customers", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("address").nullable();
    table.string("phone_number").nullable();
    table.string("email").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists("customers");
}
