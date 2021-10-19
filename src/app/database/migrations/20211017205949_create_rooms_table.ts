import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("rooms", (table) => {
    table.increments();
    table.string("room_type").notNullable();
    table.decimal("hourly_rate", 19, 2).notNullable().defaultTo(0);
    table.decimal("overstay_weekday_rate", 8, 2).nullable();
    table.decimal("overstay_weekend_rate", 8, 2).nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists("rooms");
}
