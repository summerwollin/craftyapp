(function() {
  'use strict';

  angular.module('redditApp.posts')
    .factory('commentsService', factory);


  factory.$inject = ['$http', 'env'];

  function factory ($http, env) {
    var comments = [];

    return {
      add: addComment,
      list: listComments

    }

    function listComments(postid) {
      return $http.get(env.apiHost + '/api/comments')
        .then(function (response) {
          comments = response.data;
          return comments;
        })
    }

    function addComment(comment) {
      console.log('fac-com: ', comment);
      return $http.post(env.apiHost + '/api/comments', {comment: comment})
        .then(function (response) {
          console.log('fac-then-com');
          comments.push(response.data);
          return response.data;
        })
    }

  }
}());
