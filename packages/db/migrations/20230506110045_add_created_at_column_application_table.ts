import { Knex } from "knex";
import { APPLICATIONS_TABLE_NAME } from "../models";

exports.up = (knex: Knex) => {
  return knex.schema.alterTable(APPLICATIONS_TABLE_NAME, (table) => {
    table.timestamp("created_at", { precision: 0 }).defaultTo(knex.fn.now(0));
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.alterTable(APPLICATIONS_TABLE_NAME, (table) => {
    table.dropColumn("created_at");
  });
};
