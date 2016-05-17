(function() {
  'use strict';

  angular.module('redditApp.posts')
    .directive('rcPostform', postformDirective);


  function postformDirective () {
    return {
      scope: {
        show: '='
      },
      templateUrl: '/app/layout/postform.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', '$scope', 'postsService', 'authService'];

  function controller($http, $scope, postsService, authService) {
    var vm = this;
    vm.addPost = addPost;
    vm.user = authService.currentUser;

    function addPost (user) {
      postsService.add({
        title: vm.form.post.title,
        author_id: user.details.id,
        imageUrl: vm.form.post.image,
        description: vm.form.post.description,
        date: new Date(),
        votes: 0,
        favorite: false
      }).then(function() {
        vm.form.post = {};
      })
    }

    // $scope.$watch(function(){
    //   return authService.currentUser;
    // },
    // function (newValue) {
    //   vm.user = newValue;
    // }, true);
  }

}());
