import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("reservations", (table) => {
    table.increments();
    table
      .integer("customer_id")
      .unsigned()
      .references("id")
      .inTable("customers")
      .notNullable();
    table
      .integer("room_id")
      .unsigned()
      .references("id")
      .inTable("rooms")
      .notNullable();
    table.string("room_type").notNullable();
    table.decimal("hourly_rate", 19, 2).notNullable().defaultTo(0);
    table.string("status").notNullable();
    table.timestamp("expected_checkin_time").notNullable();
    table.timestamp("checkin_time").nullable();
    table
      .timestamp("expected_checkout_time")
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp("checkout_time").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists("reservations");
}
