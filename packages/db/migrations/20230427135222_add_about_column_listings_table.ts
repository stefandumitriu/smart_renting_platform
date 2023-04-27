import { Knex } from "knex";
import { LISTINGS_TABLE_NAME } from "../models/listings/listing";

exports.up = (knex: Knex) => {
  return knex.schema.alterTable(LISTINGS_TABLE_NAME, (table) => {
    table.string("about").nullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.alterTable(LISTINGS_TABLE_NAME, (table) => {
    table.dropColumn("about");
  });
};
