import { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("auth", (table: Knex.CreateTableBuilder) => {
    table.integer("id").unique().unsigned().notNullable();
    table.foreign("id").references("users.id").onDelete("CASCADE");
    table.string("password", 128).notNullable();
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("auth");
};
