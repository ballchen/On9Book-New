angular.module('On9book.index', [])
	.controller('indexCtrl', ['$scope', '$http', function($scope, $http) {
                        cancelAnimationFrame(loop);//砍動畫thread
		$http({
			method: 'GET',
			url: '/api/book'
		}).success(function(data) {
			$scope.books = data.data;
		});
	}]);