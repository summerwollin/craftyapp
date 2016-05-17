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
      console.log('loginUser controller:', vm.form.login);
      authService.loginUser({
        username: vm.form.login.username,
        password: vm.form.login.password
      }).then(function(response) {
        vm.form.login = {};
        console.log('loginUser response: ', response.data);
          $window.localStorage.setItem('token', response.data.token);
          $location.path('/');
        })
      }

  }

}());
