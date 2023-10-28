import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("budgets", (table) => {
    table.increments("id").primary();
    table.string("uuid").unique().notNullable();
    table.string("budget_name").notNullable();
    table
      .integer("owner_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("budgets");
}
