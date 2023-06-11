import { Knex } from "knex";
import { CONTRACTS_TABLE_NAME } from "../models";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(CONTRACTS_TABLE_NAME, (table) => {
    table.integer("price").notNullable().defaultTo(500);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(CONTRACTS_TABLE_NAME, (table) => {
    table.dropColumn("price");
  });
}
