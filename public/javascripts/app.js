var loop;//動畫thread
var app = angular.module('On9book', ['cfp.hotkeys', 'oitozero.ngSweetAlert', 'ui.router', 'On9book.index', 'On9book.book', 'On9book.new']);
app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('index', {
			url: '/',
			templateUrl: 'partial/index',
			controller: 'indexCtrl'
		})
		.state('new', {
			url: '/new',
			templateUrl: 'partial/newbook',
			controller: 'newCtrl'
		})
		.state('book', {
			url: '/:id',
			templateUrl: 'partial/book',
			controller: 'bookCtrl'
		});
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
}]);