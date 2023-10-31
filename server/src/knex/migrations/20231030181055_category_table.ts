import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("category_name").notNullable();
    table
      .integer("budget_id")
      .unsigned()
      .references("id")
      .inTable("budgets")
      .onDelete("CASCADE");
    table.string("type").notNullable();
    table.bigInteger("allocated_amount").unsigned().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("categories");
}
