import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("budget_members", (table) => {
    table.increments("id").primary();
    table.integer("budget_id").notNullable();
    table.integer("member_id").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("budget_members");
}
