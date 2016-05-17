(function() {
  'use strict';

  angular.module('redditApp.posts')
    .directive('rcCommentform', commentformDirective);


  function commentformDirective () {
    return {
      scope: {
        post: '=',
      },
      templateUrl: '/app/posts/commentform.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', '$scope', 'commentsService', 'postsService'];

  function controller($http, $scope, commentsService, postsService) {
    var vm = this;

    vm.addComment = addComment;

    function addComment (post) {
      commentsService.add({
        author_id: 2,
        post_id: post.id,
        comment: vm.form.comment.text
      }).then(function() {
        postsService.list();
        vm.form.comment = {};
      })
    }
  }

}());
