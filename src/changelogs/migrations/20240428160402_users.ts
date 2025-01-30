import { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("users", function (table: Knex.CreateTableBuilder) {
    table.increments("id").primary();
    table.string("username");
    table.string("email").unique().notNullable();
    table.string("full_name");
    table.string("role");
    table.string("department");
    table.string("designation");
    table.string("country");
    table.string("contact");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("users");
};
