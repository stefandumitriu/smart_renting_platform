import { Knex } from "knex";
import { StreetTypeEnum } from "../models/listings/address";

exports.up = (knex: Knex) => {
  return knex.schema.createTable("address", (table) => {
    table.uuid("id").primary();
    table.enum("streetType", Object.values(StreetTypeEnum)).notNullable();
    table.string("streetName").notNullable();
    table.integer("streetNumber").notNullable();
    table.string("block").nullable();
    table.integer("blockEntrance").nullable();
    table.integer("floor").nullable();
    table.integer("flatNumber").nullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable("address");
};
