import { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema.createTable("user_tokens", (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.boolean("is_access_token").notNullable();
    table.boolean("is_active").notNullable();
    table.text("token").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTable("user_tokens");
};
