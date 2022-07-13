/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('users', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('firstName');
    table.string('lastName');
    table.string('email').unique();
    table.string('password');
    table.uuid('avatar').references('files.id');
    table.timestamps({ useCamelCase: true, defaultToNow: true });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.table('users', function (table) {
    table.dropForeign('avatar');
  });
  await knex.schema.dropTableIfExists('users');
};
