
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', function ( table ){
    table.increments();
    table.string('username').unique();
    table.string('password');
    table.integer('salt');
    table.boolean('admin').defaultTo(false);
  })
  .createTable('posts', function(table) {
    table.increments();
    table.string('title');
    table.integer('author_id').references('users.id').onDelete('cascade').onUpdate('cascade');
    table.string('imageUrl');
    table.text('description');
    table.string('date').notNullable().defaultTo(knex.raw('now()'));
    table.string('votes');
    table.boolean('favorite').defaultTo(false);
  })
  .createTable('comments', function(table) {
    table.increments();
    table.integer('author_id').references('users.id').onDelete('cascade').onUpdate('cascade');
    table.integer('post_id').references('posts.id').onDelete('cascade').onUpdate('cascade');
    table.text('comment');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('posts')
  .dropTable('comments')
  .dropTable('users')
};
