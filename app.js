var tolkienApp = angular.module('tolkienLibraryApp', ['ngRoute']);

    tolkienApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/books', {
            templateUrl: 'partials/book-list.html',
            controller: 'BookListCtrl'
          })
          .when('/books/:bookId', {
            templateUrl: 'partials/book-detail.html',
            controller: 'BookDetailCtrl'
          })
          .when('/books/:bookId/comments',
          {
              controller: 'CommentsController',
              templateUrl: 'partials/comments.html'
          })
          .otherwise({
            redirectTo: '/books'
          })
      }])

    tolkienApp.controller('BookListCtrl', 
        ['$scope', 'BookService',
          function($scope, BookService) {
             BookService.getBooks().success(function(data) {
                   $scope.books = data
                 })
             $scope.orderProp = 'age';
          }]);

    tolkienApp.controller('BookDetailCtrl', 
         ['$scope', '$location', '$routeParams', 'BookService', 
         function($scope, $location, $routeParams, BookService) {

             BookService.getBook($routeParams.bookId)
                .success(function(data) {
//				   console.log(data)
                   $scope.book = data
//                   $scope.img = $scope.book.images[0]
                   })
                .error(function(err) {
                    $location.path('./books') 
                  })
             $scope.setImage = function(img) {
                  $scope.img = img
               }
      }])

    tolkienApp.controller('CommentsController', ['$scope', '$location', '$routeParams', 'BookService',
       function ($scope,BookService ,$routeParams, BookService) {
		        BookService.getBook($routeParams.bookId).
				success(function(data) {$scope.book = data})
//			 console.log(BookService.getBook($routeParams.bookId))
             $scope.addComment = function(){
                $scope.book.comments.push({
                  body: $scope.comment.body,
                  author: $scope.comment.author ,
                  upvotes: 0
                })
                $scope.comment = {} ;
			 }
        }])

    tolkienApp.factory('BookService', ['$http' , function($http){
        var api = {
            getBooks : function() {
                    return $http.get('books/books.json')            
                }, 
            getBook : function(id) {
                    return $http.get('books/' + id + '.json')
                }
        }
        return api
    }])