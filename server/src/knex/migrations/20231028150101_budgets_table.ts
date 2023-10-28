import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("budgets", (table) => {
    table.increments("id").primary();
    table.string("uuid").unique().notNullable();
    table.string("budget_name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("budgets");
}
