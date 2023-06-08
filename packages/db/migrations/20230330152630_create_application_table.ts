import { Knex } from "knex";
import {
  APPLICATIONS_TABLE_NAME,
  ApplicationStatus,
  LISTINGS_TABLE_NAME,
  USER_PROFILE_TABLE_NAME,
} from "../models";

exports.up = (knex: Knex) => {
  return knex.schema.createTable(APPLICATIONS_TABLE_NAME, (table) => {
    table.uuid("id").primary();
    table.uuid("listingId").notNullable();
    table
      .foreign("listingId")
      .references("id")
      .inTable(LISTINGS_TABLE_NAME)
      .onDelete("CASCADE");
    table.uuid("tenantId").notNullable();
    table
      .foreign("tenantId")
      .references("id")
      .inTable(USER_PROFILE_TABLE_NAME)
      .onDelete("CASCADE");
    table.uuid("landlordId").notNullable();
    table
      .foreign("landlordId")
      .references("id")
      .inTable(USER_PROFILE_TABLE_NAME)
      .onDelete("CASCADE");
    table
      .enum("status", Object.values(ApplicationStatus))
      .notNullable()
      .defaultTo(ApplicationStatus.Waiting);
    table.string("additionalInfo").nullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable(APPLICATIONS_TABLE_NAME);
};
