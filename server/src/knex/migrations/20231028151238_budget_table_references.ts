import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("budget_members", (table) => {
    table.dropColumns("budget_id", "member_id");
  });
  await knex.schema.alterTable("budget_members", (table) => {
    table
      .integer("budget_id")
      .unsigned()
      .references("id")
      .inTable("budgets")
      .onDelete("CASCADE");
    table
      .integer("member_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("budget_members", (table) => {
    table.dropForeign("budget_id");
    table.dropForeign("member_id");
  });
}
