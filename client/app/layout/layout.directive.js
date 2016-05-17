(function() {
  'use strict';

  angular.module('redditApp')
    .directive('app', appDirective);

  function appDirective () {
    return {
      restrict: 'E',
      templateUrl: '/app/layout/layout.directive.html',
      controller: function () {
        var vm = this;
        vm.filters = {};
        vm.filters.sort = 'votes';
        vm.filters.direction = 'descending';
      }
    }
  }
}());
