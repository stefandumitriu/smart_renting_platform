import { Knex } from "knex";
import {
  BuildingTypeEnum,
  HeatingTypeEnum,
  SubdivisonTypeEnum,
} from "../models/listings/apartment";

exports.up = (knex: Knex) => {
  return knex.schema.createTable("apartment", (table) => {
    table.uuid("id").primary();
    table.uuid("addressId").unique().notNullable();
    table
      .foreign("addressId")
      .references("id")
      .inTable("address")
      .onDelete("CASCADE");
    table.uuid("ownerId").notNullable();
    table
      .foreign("ownerId")
      .references("id")
      .inTable("user_basic_info")
      .onDelete("CASCADE");
    table.integer("noOfRooms").notNullable();
    table.integer("noOfBathrooms").notNullable();
    table.integer("noOfBalconies").notNullable();
    table.enum("subdivision", Object.values(SubdivisonTypeEnum)).notNullable();
    table.enum("buildingType", Object.values(BuildingTypeEnum)).notNullable();
    table.boolean("cooling").nullable();
    table.enum("heating", Object.values(HeatingTypeEnum)).nullable();
    table.json("utilities").nullable();
    table.json("appliances").nullable();
    table.json("finishes").nullable();
    table.string("areaInfo").nullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable("apartment");
};
