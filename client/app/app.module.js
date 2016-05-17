(function() {
  'use strict';

  var dependencies = [
    'ngRoute',
    'angularMoment',
    'redditApp.posts'
  ];

  angular.module('redditApp', dependencies)
  .config(setupRoutes);

  if (window.location.hostname === 'localhost') {
    angular.module('redditApp').constant('env', {apiHost: 'http://localhost:3000'});
  } else {
    angular.module('redditApp').constant('env', {apiHost: 'https://peaceful-anchorage-88641.herokuapp.com'});
  }

  setupRoutes.$inject = [
    '$routeProvider',
    '$locationProvider',
    '$httpProvider'
  ];

  function setupRoutes($routeProvider, $locationProvider, $httpProvider){
    $httpProvider.interceptors.push("authInterceptor");

    $routeProvider
    .when('/', {
      template: '<app></app>',
      resolve: {
        currentUser: function ($http, $rootScope) {
          $http.get(apiHost + '/api/users/me')
          .then(function (response) {
              var currentUser = response.data;
              $rootScope.currentUser = currentUser;
              return currentUser;
          })
          .catch(function () {
            localStorage.clear();
            return null;
          })
        }
      }
    })
    .when('/signup', {
      template: '<rc-signup></rc-signup>'
    })
    .when('/login', {
      template: '<rc-login></rc-login>'
    });

    $locationProvider.html5Mode(true);
  };
}());
