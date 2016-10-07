
exports.up = function(knex, Promise) {

    return knex.schema.createTableIfNotExists("comments", function(table){
    	 table.increments().primary();
         table.string("comment_text").notNullable();
         table.integer('post_id');
         table.foreign('post_id').references('posts.id').onDelete('CASCADE');
         table.string('by_username');
         table.foreign('by_username').references('users.username').onDelete('CASCADE');

    });
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments');
  };
