import { Knex } from "knex";
import { MESSAGES_TABLE_NAME, USER_PROFILE_TABLE_NAME } from "../models";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(MESSAGES_TABLE_NAME, (table) => {
    table.uuid("id").primary();
    table.uuid("senderId").notNullable();
    table
      .foreign("senderId")
      .references("id")
      .inTable(USER_PROFILE_TABLE_NAME)
      .onDelete("CASCADE");
    table.uuid("receiverId").notNullable();
    table
      .foreign("receiverId")
      .references("id")
      .inTable(USER_PROFILE_TABLE_NAME)
      .onDelete("CASCADE");
    table.string("text").notNullable();
    table.timestamp("created_at", { precision: 0 }).defaultTo(knex.fn.now(0));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(MESSAGES_TABLE_NAME);
}
