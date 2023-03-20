import { Knex } from "knex";
import { USER_PROFILE_TABLE_NAME } from "../models";
import { FAVOURITE_LISTINGS_TABLE_NAME } from "../models/listings/favouriteListing";
import { LISTINGS_TABLE_NAME } from "../models/listings/listing";

exports.up = (knex: Knex) => {
  return knex.schema.createTable(FAVOURITE_LISTINGS_TABLE_NAME, (table) => {
    table.uuid("id").primary();
    table.uuid("listingId").notNullable();
    table
      .foreign("listingId")
      .references("id")
      .inTable(LISTINGS_TABLE_NAME)
      .onDelete("CASCADE");
    table.uuid("userId").notNullable();
    table
      .foreign("userId")
      .references("id")
      .inTable(USER_PROFILE_TABLE_NAME)
      .onDelete("CASCADE");
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable(FAVOURITE_LISTINGS_TABLE_NAME);
};
