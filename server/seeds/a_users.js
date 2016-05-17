exports.seed = function(knex, Promise) {
  return Promise.join(

    knex('users').del(),

    knex('users').insert({
      username: 'TallyTish',
      password: '$2a$10$SyMaBzAAHO3dwU9LUiEu4OmwXAgMqnnzgfgGJEJ777EOXEPHKt7e6',
      salt: 12868,
      admin: true
    }),
    knex('users').insert({
      username: 'happyaddie',
      password: 'testuser',
      admin: false
    }),
    knex('users').insert({
      username: 'craftycallie',
      password: 'testuser',
      admin: false
    })

  );
};
