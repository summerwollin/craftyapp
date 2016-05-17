(function() {
  'use strict';

  angular.module('redditApp.posts')
    .directive('rcComments', commentsDirective);


  function commentsDirective () {
    return {
      scope: {
        post: '=',
      },
      templateUrl: '/app/posts/comments.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', '$scope', 'commentsService'];

  function controller($http, $scope, commentsService) {
    var vm = this;

    vm.listComments = listComments;

    function listComments (id) {
      commentsService.list({
        post_id: id
      }).then(function() {
        console.log('32 c-d');
      })
    }
  }

}());
