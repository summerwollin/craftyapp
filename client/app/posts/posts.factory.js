(function() {
  'use strict';

  angular.module('redditApp.posts')
    .factory('postsService', factory);


  factory.$inject = ['$http', 'env'];

  function factory ($http, env) {
    var posts = [];

    var host = env.apiHost;

    return {
      add: addPost,
      list: listPosts,
      getUsernames: getUsernames,
      deletePost: deletePost,
      voteClick: voteClick

    }

    function listPosts() {
      console.log('env::::: ', env.apiHost);
      return $http.get(apiHost + '/api/posts')
        .then(function (response) {
          posts = response.data;
          return $http.get(env.apiHost + '/api/comments')
            .then(function (response) {
              var commentsRes = response.data;
              posts.forEach(function(post){
                post.comments = [];
                commentsRes.forEach(function(comment){
                  if (post.id === comment.post_id) {
                    post.comments.push(comment);
                  }
                })
              })
              return posts;
            })
        })
    };

    function getUsernames() {
      return $http.get(env.apiHost + '/api/users')
        .then(function (response) {
          var users = response.data;
          users.forEach(function(user){
            posts.forEach(function(post){
              if (post.author_id === user.id) {
                post.authorName = user.username;
              }
              post.comments.forEach(function(comment){
                if (comment.author_id === user.id) {
                  comment.authorName = user.username;
                }
              })
            })
          })
          return posts;
        })
    }

    vm.posts.forEach(function(post){
      post.comments = [];
      listcomments.forEach(function(comment){
        if (post.id === comment.post_id) {
          post.comments.push(comment);
          console.log(post);
        }
      })
    })

    function addPost(post) {
      console.log('fac-post: ', post);
      return $http.post(env.apiHost + '/api/posts', {post: post})
        .then(function (response) {
          console.log('fac-then');
          posts.push(response.data);
          return response.data;
        })
    }

    function addComment(comment) {
      console.log('fac-post: ', post);
      return $http.post(env.apiHost + '/api/posts', {post: post})
        .then(function (response) {
          console.log('fac-then');
          posts.push(response.data);
          return response.data;
        })
    }

    function deletePost(postId) {
      return $http.post(env.apiHost + '/api/posts/delete', {postId: postId})
    }
    function voteClick(postId, vote) {
      return $http.post(env.apiHost + '/api/posts/vote', {postId: postId, vote: vote})
    }

  }
}());
