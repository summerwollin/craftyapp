
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert({
      author_id: 1,
      post_id: 2,
      comment: 'This is a super neat idea for a weekend project!'
    }),

    knex('comments').insert({
      author_id: 2,
      post_id: 1,
      comment: 'Keep the posts coming, I love your ideas!'
    }),

    knex('comments').insert({
      author_id: 2,
      post_id: 3,
      comment: 'I will be making these with my kids this weekend.'
    })

  );
};
