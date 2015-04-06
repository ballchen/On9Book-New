angular.module('On9book.new', ['angularFileUpload'])
	.controller('newCtrl', ['$scope', '$http', '$upload', 'hotkeys', '$state', function($scope, $http, $upload, hotkeys, $state) {

		$scope.files = [];
		$scope.allfiles = [];
		$scope.focus = null;

		Array.prototype.move = function(old_index, new_index) {
			//left
			if (old_index > new_index && new_index != -1) {
				this.splice(new_index, 0, this.splice(old_index, 1)[0]);
			}
			//right
			else if (old_index < new_index && new_index != this.length) {
				this.splice(new_index, 0, this.splice(old_index, 1)[0]);
			}

			return this; // for testing purposes
		};


		$scope.createBook = function() {
			$http({
				method: 'POST',
				url: '/api/book',
				data: $scope.newbook
			}).success(function(data) {
				if (data.success) {
					$scope.book = data.data;
				}
			});
		};

		$scope.focusImage = function(idx) {
			$scope.focus = idx;
		};

		$scope.upload = function(files) {


			if (files && files.length) {
				console.log(files)
				var filenames = [];
				for (var i = 0; i < files.length; i++) {
					filenames.push('book' + $scope.book.id + '-' + i + '-');
				}
				$upload.upload({
					url: '/api/book/upload',
					fields: {
						'book': $scope.book.id,
						'type': 'image/png'
					},
					file: files,
					fileName: filenames
				}).progress(function(evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('progress: ' + progressPercentage + '% ');
				}).success(function(data, status, headers, config) {
					console.log('file uploaded. Response: ' + JSON.stringify(data));
					$state.go('book', {
						id: $scope.book.id
					});
				});

			}
		};

		hotkeys.bindTo($scope)
			.add({
				combo: 'left',
				description: 'blah blah',
				callback: function() {
					if ($scope.focus !== 0) {
						$scope.allfiles.move($scope.focus, ($scope.focus - 1))
						$scope.focus -= 1;
					}
				}
			})
			.add({
				combo: 'right',
				description: 'blah blah',
				callback: function() {
					if ($scope.focus !== ($scope.allfiles.length - 1)) {
						$scope.allfiles.move($scope.focus, ($scope.focus + 1))
						$scope.focus += 1;
					}
				}
			})
			.add({
				combo: 'esc',
				description: 'blah blah',
				callback: function() {
					$scope.focus = null;
				}
			})
			.add({
				combo: 'del',
				description: 'blah blah',
				callback: function() {
					if ($scope.focus !== null) {
						$scope.allfiles.splice($scope.focus, 1);
						if ($scope.focus >= $scope.allfiles.length) {
							$scope.focus = ($scope.allfiles.length - 1);
						}
					}
				}
			})

		$scope.onFileSelect = function() {

			var i = 0;
			var imageType = /image.*/;
			$scope.readfiles = [];
			var reader = new FileReader();
			if ($scope.files[i] !== undefined) {
				reader.readAsDataURL($scope.files[i]);
			}



			//event
			reader.onload = function(e) {
				// Create a new image.
				console.log(1234)
				$scope.files[i].src = reader.result;
				$scope.allfiles.push($scope.files[i]);
				$scope.$apply();
			};
			//end onload

			//event
			reader.onloadend = function(e) {
				i++;
				if ($scope.files[i] !== undefined) {

					reader.readAsDataURL($scope.files[i]); //event trigger

				};
			};
			//end onloadend
		};
	}]);