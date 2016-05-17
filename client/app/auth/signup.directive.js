(function() {
  'use strict';

  angular.module('redditApp.posts')
    .directive('rcSignup', signupDirective);


  function signupDirective () {
    return {
      scope: {
      },
      templateUrl: '/app/auth/signup.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', 'authService', '$window', '$location'];

  function controller($http, authService, $window, $location) {
    var vm = this;
    vm.addUser = addUser;

    function addUser(user) {
      console.log('addUser controller:', vm.form.signup);
      authService.addUser({
        username: vm.form.signup.username,
        password: vm.form.signup.password
      }).then(function(response) {
        vm.form.signup = {};
        console.log('addUser response: ', response.data);
          $window.localStorage.setItem('token', response.data.token);
          $location.path('/');
        })
      }

  }

}());
