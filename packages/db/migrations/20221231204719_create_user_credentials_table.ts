import { Knex } from "knex";
import { USER_CREDENTIALS_TABLE_NAME } from "../models/users/userCredentials";

exports.up = (knex: Knex) => {
  return knex.schema.createTable(USER_CREDENTIALS_TABLE_NAME, (table) => {
    table.uuid("id").primary();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable(USER_CREDENTIALS_TABLE_NAME);
};
