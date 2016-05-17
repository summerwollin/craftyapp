(function() {
  'use strict';

  angular.module('redditApp.posts')
    .directive('rcPosts', postsDirective);


  function postsDirective () {
    return {
      scope: {
        filters: '='
      },
      templateUrl: '/app/posts/posts.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', 'postsService', 'commentsService', 'authService'];

  function controller($http, postsService, commentsService, authService) {
    var vm = this;
    vm.show = {};
    vm.show.commentform = false;
    vm.show.comments = false;
    vm.user = authService.currentUser;
    vm.deletePost = deletePost;
    vm.voteClick = voteClick;

    activate();

    function activate() {
      postsService.list().then(function(posts1) {
        postsService.getUsernames().then(function(posts){
          vm.posts = posts;
        })

      })

    }

    function deletePost(post) {
      if (vm.user.details.valid && post.author_id === vm.user.details.id) {
        postsService.deletePost(post.id).then(function(response) {
          activate();
        })
      }
    }

    function voteClick(postId, vote) {
      if (vm.user.details.valid) {
        postsService.voteClick(postId, vote).then(function(response){
          activate();
        })
      }
    }
  }

}());
