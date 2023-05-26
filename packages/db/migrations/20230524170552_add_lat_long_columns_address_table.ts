import { Knex } from "knex";
import { ADDRESS_TABLE_NAME } from "../models";

exports.up = (knex: Knex) => {
  return knex.schema.alterTable(ADDRESS_TABLE_NAME, (table) => {
    table.double("lat").notNullable().defaultTo(44.437110752368916);
    table.double("long").notNullable().defaultTo(26.101701101613006);
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.alterTable(ADDRESS_TABLE_NAME, (table) => {
    table.dropColumn("lat");
    table.dropColumn("long");
  });
};
