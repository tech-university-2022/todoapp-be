/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('files', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name');
    table.string('mime');
    table.float('size');
    table.string('provider');
    table.string('path');
    table.string('pipeFrom');
    table.string('thumbnailPipeFrom');
    table.timestamps({ useCamelCase: true, defaultToNow: true });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('files');
};
