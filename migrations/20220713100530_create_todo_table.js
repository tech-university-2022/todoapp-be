/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('todos', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title');
    table.text('content');
    table.uuid('createdBy').references('users.id').notNullable();
    table.string('category');
    table.string('status');
    table.dateTime('dueDate');
    table.timestamps({ useCamelCase: true, defaultToNow: true });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.table('todos', function (table) {
    table.dropForeign('createdBy');
  });
  await knex.schema.dropTableIfExists('todos');
};
