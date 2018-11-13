
exports.up = async function (knex) {
  await knex.schema.createTable('tracks', table => {
    table.increments();
    table.string('filepath').notNullable().unique().index();
    table.json('format');
    table.json('tags');
    table.boolean('has_error');
    table.string('error_message');
    table.timestamps();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('tracks');
};
