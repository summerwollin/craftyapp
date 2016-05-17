(function() {
  'use strict';

  angular.module('redditApp')
    .factory('authService', factory);


  factory.$inject = ['$http', 'env'];

  function factory ($http, env) {

    var currentUser = {};

    return {
      addUser: addUser,
      loginUser: loginUser,
      setCurrentUser: setCurrentUser,
      clearCurrentUser: clearCurrentUser,
      currentUser: currentUser
    }

    function addUser(user) {
      return $http.post(env.apiHost + '/api/users', {user: user})
    }

    function loginUser(user) {
      return $http.post(env.apiHost + '/api/users/login', {user: user})
    }

    function setCurrentUser() {
      $http.get(env.apiHost + '/api/users/me')
      .then(function (response) {
          currentUser.details = response.data;
          return currentUser;
      })
    }

    function clearCurrentUser() {
      currentUser = {};
    }
  }
}());
