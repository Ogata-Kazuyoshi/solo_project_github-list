/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('repository_info', function (table) {
    table
      .integer('user_id')
      .references('user_authentification.id')
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('repository_info', function (table) {
    table.dropColumn('user_id');
  });
};
