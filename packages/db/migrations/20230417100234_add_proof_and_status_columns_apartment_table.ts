import { Knex } from "knex";
import {
  APARTMENTS_TABLE_NAME,
  ApartmentStatus,
} from "../models/listings/apartment";

exports.up = (knex: Knex) => {
  return knex.schema.alterTable(APARTMENTS_TABLE_NAME, (table) => {
    table.string("addressProof").nullable();
    table
      .enum("status", Object.values(ApartmentStatus))
      .notNullable()
      .defaultTo(ApartmentStatus.Available);
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.alterTable(APARTMENTS_TABLE_NAME, (table) => {
    table.dropColumn("addressProof");
    table.dropColumn("status");
  });
};
