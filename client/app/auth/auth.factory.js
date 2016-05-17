(function() {
  'use strict';

  angular.module('redditApp')
    .factory('authService', factory);


  factory.$inject = ['$http'];

  function factory ($http) {

    var currentUser = {};

    return {
      addUser: addUser,
      loginUser: loginUser,
      setCurrentUser: setCurrentUser,
      clearCurrentUser: clearCurrentUser,
      currentUser: currentUser
    }

    function addUser(user) {
      console.log('factory addUser: ', user);
      return $http.post(apiHost + '/api/users', {user: user})
    }

    function loginUser(user) {
      console.log('factory loginUser: ', user);
      return $http.post(apiHost + '/api/users/login', {user: user})
    }

    function setCurrentUser() {
      $http.get(apiHost + '/api/users/me')
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
