import { Knex } from "knex";
import { LISTINGS_TABLE_NAME } from "../models/listings/listing";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(LISTINGS_TABLE_NAME, (table) => {
    table.dropColumn("photosUrl");
  });
  return knex.schema.alterTable(LISTINGS_TABLE_NAME, (table) => {
    table.specificType("photosUrl", "text[]");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(LISTINGS_TABLE_NAME, (table) => {
    table.dropColumn("photosUrl");
  });
  return knex.schema.alterTable(LISTINGS_TABLE_NAME, (table) => {
    table.json("photosUrl");
  });
};
