'use strict'

angular.module('BoardGame', [
	'BoardGame.controllers',
	'BoardGame.services',
	'ngResource',
	'ngRoute'
]).config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when("/",{templateUrl:"partials/games",controller:'GamesController'})
		.when("/:id",{templateUrl:"partials/game",controller:'GameController'})
		.otherwise("/")
}])