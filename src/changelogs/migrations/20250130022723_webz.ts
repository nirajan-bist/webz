import { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("posts", (table: Knex.CreateTableBuilder) => {
    table.increments("id").primary();
    table.string("thread_id", 255);
    table.text("title");
    table.text("url");
    table.text("text");
    table.timestamp("published");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("posts");
};
