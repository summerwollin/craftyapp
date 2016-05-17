const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile')['development']);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



router.get('/posts', function(req, res, next) {
  knex('posts').then(function(posts) {
    res.json(posts);
  })
});

router.post('/posts', function(req, res, next) {
  knex('posts').insert(req.body.post).returning('*').then(function (posts){
    res.json(posts[0]);
  })
})

router.post('/posts/vote', function(req, res, next) {
  knex('posts').where({id: req.body.postId}).then(function (post){
    newVote = parseInt(post[0].votes);
    newVote += parseInt(req.body.vote);
    knex('posts').where({id: req.body.postId}).update({votes: newVote}).returning('*')
      .then(function (posts) {
        res.json(posts[0]);
      })
  })
})

router.post('/posts/delete', function(req, res, next) {
  knex('posts').where({id: req.body.postId}).del().returning('*').then(function (posts){
    res.json(posts[0]);
  })
})

router.get('/comments', function(req, res, next) {
  knex('comments').then(function(comments) {
    res.json(comments);
  })
});

router.post('/comments', function(req, res, next) {
  knex('comments').insert(req.body.comment).returning('*').then(function (comments){
    res.json(comments[0]);
  })
})

router.get('/users', function(req, res, next) {
  knex('users').then(function(users) {
    res.json(users);
  })
});

router.get('/users/me', function (req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    knex('users').where({id: payload.id}).first().then(function (user) {
      if (user) {
        res.json({id: user.id, name: user.username, valid: true})
      } else {
        res.json({
          error: "invalid id",
          valid: false
        })
      }
    })

  } else {
    res.json({
      error: "no token"
    })
  }
})

router.post('/users', function(req, res, next) {
    const errors = [];

    if (!req.body.user.username || !req.body.user.username.trim()) errors.push("Username can't be blank");
    if (!req.body.user.password || !req.body.user.password.trim()) errors.push("Password can't be blank");

    if (errors.length) {
      res.status(422).json({
        errors: errors
      })
    } else {
      knex('users')
        .whereRaw('lower(username) = ?', req.body.user.username.toLowerCase())
        .count()
        .first()
        .then(function (result) {
          if (result.count === "0") {
            const saltRounds = 4;
            const passwordHash = bcrypt.hashSync(req.body.user.password, saltRounds);

            knex('users')
              .insert({
                username: req.body.user.username,
                password: passwordHash,
              })
            .returning('*')
            .then(function (users) {
              const user = users[0];
              const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
              res.json({
                id: user.id,
                username: user.username,
                token: token
              })
            })

          } else {
            res.status(422).json({
              errors: ["Username has been taken"]
            })
          }
        })
    }
});

router.post('/users/login', function(req, res, next) {
    const errors = [];

    if (!req.body.user.username || !req.body.user.username.trim()) errors.push("Username can't be blank");
    if (!req.body.user.password || !req.body.user.password.trim()) errors.push("Password can't be blank");

    if (errors.length) {
      res.status(422).json({
        errors: errors
      })
    } else {
      knex('users')
        .whereRaw('lower(username) = ?', req.body.user.username.toLowerCase())
        .first()
        .then(function (thisuser) {

          if (thisuser) {

            if (bcrypt.compareSync(req.body.user.password, thisuser.password)) {
              const token = jwt.sign({id: thisuser.id}, process.env.JWT_SECRET);
              res.json({
                id: thisuser.id,
                username: thisuser.username,
                token: token
              })

            } else {
              res.status(422).json({
                errors: ["Invalid Login"]
              })
            }

          } else {
            res.status(422).json({
              errors: ["Invalid Login"]
            })
          }
        })
    }
});


module.exports = router;
