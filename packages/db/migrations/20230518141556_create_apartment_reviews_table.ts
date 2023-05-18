import { Knex } from "knex";
import {
  APARTMENT_REVIEWS_TABLE_NAME,
  APARTMENTS_TABLE_NAME,
  USER_PROFILE_TABLE_NAME,
} from "../models";

exports.up = (knex: Knex) => {
  return knex.schema.createTable(APARTMENT_REVIEWS_TABLE_NAME, (table) => {
    table.uuid("id").primary();
    table.timestamp("created_at", { precision: 0 }).defaultTo(knex.fn.now(0));
    table.uuid("reviewerId").notNullable();
    table
      .foreign("reviewerId")
      .references("id")
      .inTable(USER_PROFILE_TABLE_NAME)
      .onDelete("CASCADE");
    table.uuid("apartmentId").notNullable();
    table
      .foreign("apartmentId")
      .references("id")
      .inTable(APARTMENTS_TABLE_NAME)
      .onDelete("CASCADE");
    table.integer("comfortRating").checkBetween([0, 5]).notNullable();
    table.integer("locationRating").checkBetween([0, 5]).notNullable();
    table.integer("qualityRating").checkBetween([0, 5]).notNullable();
    table.string("comment").nullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable(APARTMENT_REVIEWS_TABLE_NAME);
};
