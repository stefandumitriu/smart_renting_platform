import { Knex } from "knex";
import { USER_CREDENTIALS_TABLE_NAME } from "../models/users/userCredentials";
import { USER_PROFILE_TABLE_NAME } from "../models/users/userProfile";

exports.up = (knex: Knex) => {
  return knex.schema.createTable(USER_PROFILE_TABLE_NAME, (table) => {
    table.uuid("id").primary();
    table.uuid("userId").notNullable().unique();
    table
      .foreign("userId")
      .references("id")
      .inTable(USER_CREDENTIALS_TABLE_NAME)
      .onDelete("CASCADE");
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable(USER_PROFILE_TABLE_NAME);
};
