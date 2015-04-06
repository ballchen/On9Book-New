angular.module('On9book.book', [])
	.controller('bookCtrl', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {

		var bookid = $stateParams.id;

		$http({
			method: 'GET',
			url: '/api/book/' + bookid
		}).success(function(data) {
			if (data.success) {
				$scope.book = data.data;
				console.log($scope.book)
			} else {
				swal({
					title: '讀取失敗',
					text: data.msg,
					type: 'error'
				}, function() {
					$state.go('index');
				});
			}
		});
	}]);