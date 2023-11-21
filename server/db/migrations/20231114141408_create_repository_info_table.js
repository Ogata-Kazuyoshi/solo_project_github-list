/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('repository_info', function (table) {
    table.increments('id').primary();
    table.string('project_name', 64);
    table.date('create_date');
    table.string('description', 64);
    table.boolean('like');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('repository_info');
};
