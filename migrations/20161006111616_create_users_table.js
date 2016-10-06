exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table){
    table.increments();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.boolean('admin').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
