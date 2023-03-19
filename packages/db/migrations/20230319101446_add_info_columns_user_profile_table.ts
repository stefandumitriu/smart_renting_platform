import { Knex } from "knex";
import { USER_PROFILE_TABLE_NAME } from "../models";

exports.up = (knex: Knex) => {
  return knex.schema.alterTable(USER_PROFILE_TABLE_NAME, (table) => {
    table.string("phoneNumber").nullable();
    table.string("town").nullable();
    table.date("dateOfBirth").nullable();
    table.string("about").nullable();
    table.string("profilePhotoUrl").nullable();
    table.string("employmentStatus").nullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.alterTable(USER_PROFILE_TABLE_NAME, (table) => {
    table.dropColumns(
      "phoneNumber",
      "town",
      "dateOfBirth",
      "about",
      "profilePhotoUrl",
      "employmentStatus"
    );
  });
};
