exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tracks').del();
  // that's all we want here, start with no entries
};
