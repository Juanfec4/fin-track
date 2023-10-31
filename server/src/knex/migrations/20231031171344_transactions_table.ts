import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table.bigInteger("amount").unsigned().defaultTo(0);
    table
      .integer("budget_id")
      .unsigned()
      .references("id")
      .inTable("budgets")
      .onDelete("CASCADE");
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
    table.dateTime("date").defaultTo(knex.fn.now());
    table.string("description");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("transactions");
}
