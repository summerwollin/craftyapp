(function() {
  'use strict';

  angular.module('redditApp.posts')
    .directive('rcLogin', loginDirective);


  function loginDirective () {
    return {
      scope: {
      },
      templateUrl: '/app/auth/login.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', 'authService', '$window', '$location'];

  function controller($http, authService, $window, $location) {
    var vm = this;
    vm.loginUser = loginUser;

    function loginUser(user) {
      authService.loginUser({
        username: vm.form.login.username,
        password: vm.form.login.password
      }).then(function(response) {
        vm.form.login = {};
          $window.localStorage.setItem('token', response.data.token);
          $location.path('/');
        })
      }

  }

}());
