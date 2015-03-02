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
              controller: 'BcommentsController',
              templateUrl: 'partials/bcomments.html'
          })
          .when('/films', {
            templateUrl: 'partials/film-list.html',
            controller: 'FilmListCtrl'
          })
          .when('/films/:filmId', {
            templateUrl: 'partials/film-detail.html',
            controller: 'FilmDetailCtrl'
          })
          .when('/films/:filmId/comments',
          {
              controller: 'FcommentsController',
              templateUrl: 'partials/fcomments.html'
          })
          .otherwise({
            redirectTo: '/books'
          })
      }])

    tolkienApp.controller('BookListCtrl', 
        ['$scope', 'BookService',
          function($scope, BookService) {
			  $scope.image = 'img/JRRT.png';
             BookService.getBooks().success(function(data) {
                   $scope.books = data
                 })
             $scope.orderProp = 'age';
			  $scope.incrementUpvotes = function(book) {
                  book.upvotes += 1;

       }
          }]);

    tolkienApp.controller('BookDetailCtrl', 
         ['$scope', '$location', '$routeParams', 'BookService', 
         function($scope, $location, $routeParams, BookService) {

             BookService.getBook($routeParams.bookId)
                .success(function(data) {
                   $scope.book = data
                   })
                .error(function(err) {
                    $location.path('./books') 
                  })
             $scope.setImage = function(img) {
                  $scope.img = img
               }
      }])


    tolkienApp.controller('FilmListCtrl', 
        ['$scope', 'FilmService',
          function($scope, FilmService) {
             FilmService.getFilms().success(function(data) {
                   $scope.films = data
                 })
             $scope.orderProp = 'age';
        $scope.incrementUpvotes = function(film) {
                  film.upvotes += 1;

       }
          }]);

    tolkienApp.controller('FilmDetailCtrl', 
         ['$scope', '$location', '$routeParams', 'FilmService', 
         function($scope, $location, $routeParams, FilmService) {

             FilmService.getFilm($routeParams.filmId)
                .success(function(data) {
                   $scope.film = data
                   })
                .error(function(err) {
                    $location.path('./films') 
                  })
             $scope.setImage = function(img) {
                  $scope.img = img
               }
      }])


    tolkienApp.controller('BcommentsController', ['$scope', '$location', '$routeParams', 'BookService',
       function ($scope,BookService ,$routeParams, BookService) {
		        BookService.getBook($routeParams.bookId).
				success(function(data) {$scope.book = data})
             $scope.addComment = function(){
                $scope.book.comments.push({
                  body: $scope.comment.body,
                  author: $scope.comment.author ,
                })
                $scope.comment = {} ;
			 }
        }])
	
	    tolkienApp.controller('FcommentsController', ['$scope', '$location', '$routeParams', 'FilmService',
       function ($scope,FilmService ,$routeParams, FilmService) {
		        FilmService.getFilm($routeParams.filmId).
				success(function(data) {$scope.film = data})
             $scope.addComment = function(){
                $scope.film.comments.push({
                  body: $scope.comment.body,
                  author: $scope.comment.author ,
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

    tolkienApp.factory('FilmService', ['$http' , function($http){
        var api = {
            getFilms : function() {
                    return $http.get('films/films.json')            
                }, 
            getFilm : function(id) {
                    return $http.get('films/' + id + '.json')
                }
        }
        return api
    }])