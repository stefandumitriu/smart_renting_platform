import { Knex } from "knex";
import {
  APARTMENTS_TABLE_NAME,
  ContractStatus,
  USER_PROFILE_TABLE_NAME,
} from "../models";

exports.up = (knex: Knex) => {
  return knex.schema.createTable("contract", (table) => {
    table.uuid("id").primary();
    table.uuid("apartmentId").notNullable();
    table
      .foreign("apartmentId")
      .references("id")
      .inTable(APARTMENTS_TABLE_NAME)
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
    table.date("startDate").notNullable();
    table.date("endDate").nullable();
    table.string("rentPayday", 2).notNullable();
    table.string("paymentInfo").nullable();
    table.integer("depositValue").notNullable();
    table.string("additionalClauses").nullable();
    table
      .enum("status", Object.values(ContractStatus))
      .notNullable()
      .defaultTo(ContractStatus.Draft);
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable("contract");
};
