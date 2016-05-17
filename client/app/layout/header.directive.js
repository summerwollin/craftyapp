(function() {
  'use strict';

  angular.module('redditApp')
    .directive('rcHeader', headerDirective);

  function headerDirective () {
    return {
      scope: {
        filters: '='
      },
      templateUrl: '/app/layout/header.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['postsService', 'authService'];
  function controller(postsService, authService) {
    var vm = this;
    vm.show = {};
    vm.show.form = false;
    vm.logout = logout;
    vm.user = authService.currentUser;

    setCurrentUser();

    function logout() {
      localStorage.removeItem('token');
      authService.clearCurrentUser();
    }

    function setCurrentUser() {
      authService.setCurrentUser();
    }

  }

}());
