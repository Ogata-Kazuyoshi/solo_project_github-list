/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user_authentification', function (table) {
    table.increments('id').primary();
    table.string('user_name', 64).notNullable();
    table.string('salt', 64).notNullable();
    table.string('hased_password', 256).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('user_authentification');
};
