import { Knex } from "knex";
import {
  ReviewType,
  USER_PROFILE_TABLE_NAME,
  USER_REVIEWS_TABLE_NAME,
} from "../models";

exports.up = (knex: Knex) => {
  return knex.schema.createTable(USER_REVIEWS_TABLE_NAME, (table) => {
    table.uuid("id").primary();
    table.timestamp("created_at", { precision: 0 }).defaultTo(knex.fn.now(0));
    table.uuid("reviewerId").notNullable();
    table
      .foreign("reviewerId")
      .references("id")
      .inTable(USER_PROFILE_TABLE_NAME)
      .onDelete("CASCADE");
    table.uuid("userId").notNullable();
    table
      .foreign("userId")
      .references("id")
      .inTable(USER_PROFILE_TABLE_NAME)
      .onDelete("CASCADE");
    table.enum("type", Object.values(ReviewType)).notNullable();
    table.integer("fairnessRating").checkBetween([0, 5]).notNullable();
    table.integer("communicationRating").checkBetween([0, 5]).notNullable();
    table.integer("availabilityRating").checkBetween([0, 5]).notNullable();
    table.string("comment").nullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable(USER_REVIEWS_TABLE_NAME);
};
