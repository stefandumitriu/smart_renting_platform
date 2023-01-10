import { Knex } from "knex";

exports.up = (knex: Knex) => {
  return knex.schema.createTable("listing", (table) => {
    table.uuid("id").primary();
    table.date("timeCreated").defaultTo(knex.fn.now());
    table.date("lastUpdated").defaultTo(knex.fn.now());
    table.uuid("apartmentId").unique().notNullable();
    table
      .foreign("apartmentId")
      .references("id")
      .inTable("apartment")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.json("photosUrl").nullable();
    table.integer("price").notNullable();
    table.string("rentalPeriod").nullable();
    table.string("availability").nullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable("listing");
};
