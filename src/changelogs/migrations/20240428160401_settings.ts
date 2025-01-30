import { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("settings", function (table: Knex.CreateTableBuilder) {
    table.increments("id").primary();
    table.string("name");
    table.json("value");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("settings");
};
