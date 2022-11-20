import { Knex } from "knex";

exports.up = (knex: Knex) => {
    return knex.schema
        .createTable('user_basic_info', (table) => {
            table.uuid('id').primary();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.string('firstName').notNullable();
            table.string('lastName').notNullable();
        });
}


exports.down = (knex: Knex) => {
    return knex.schema.dropTable('user_basic_info');
}