angular.module('On9book.index', [])
	.controller('indexCtrl', ['$scope', '$http', function($scope, $http) {
		$http({
			method: 'GET',
			url: '/api/book'
		}).success(function(data) {
			$scope.books = data.data;
		});
	}]);