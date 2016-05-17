(function() {
  'use strict';

  angular.module('redditApp')
  .factory('authInterceptor', function ($location) {

    return {
      request: function(config) {
        if (localStorage.getItem('token')) {
          config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        }

        return config;
      },

      responseError: function(response) {
        if (response.status === 403) {
          $location.path('/');
        }
        return response;
      }
    };
  })

}());
