angular.module('On9book.book', [])
	.controller('bookCtrl', ['$scope', '$http', '$stateParams', 'hotkeys', '$state', function($scope, $http, $stateParams, hotkeys, $state) {
		cancelAnimationFrame(loop);//砍動畫thread
		var bookid = $stateParams.id;

		$http({
			method: 'GET',
			url: '/api/book/' + bookid
		}).success(function(data) {
			if (data.success) {
				$scope.book = data.data;
				threeFunction(data.data);
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



		hotkeys.bindTo($scope)
			.add({
				combo: 'left',
				description: 'blah blah',
				callback: function() {
					backPage();
				}
			})
			.add({
				combo: 'right',
				description: 'blah blah',
				callback: function() {
					nextPage();
				}
			})
	}]);


