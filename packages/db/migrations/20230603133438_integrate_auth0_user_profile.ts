import { Knex } from "knex";
import {
  USER_CREDENTIALS_TABLE_NAME,
  USER_PROFILE_TABLE_NAME,
} from "../models";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(USER_PROFILE_TABLE_NAME, (table) => {
    table.dropForeign("userId");
  });
  await knex.schema.alterTable(USER_PROFILE_TABLE_NAME, (table) => {
    table.string("userId").alter();
    table.string("email").notNullable();
  });
  return knex.schema.dropTable(USER_CREDENTIALS_TABLE_NAME);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable(USER_CREDENTIALS_TABLE_NAME, (table) => {
    table.uuid("id").primary();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
  });
  await knex.schema.alterTable(USER_PROFILE_TABLE_NAME, (table) => {
    table.dropColumn("email");
    table.uuid("userId").alter();
  });
  return knex.schema.alterTable(USER_PROFILE_TABLE_NAME, (table) => {
    table
      .foreign("userId")
      .references("id")
      .inTable(USER_CREDENTIALS_TABLE_NAME)
      .onDelete("CASCADE");
  });
}
