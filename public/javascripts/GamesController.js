'use strict'

angular.module('BoardGame.controllers',[])
    .controller('GamesController',function($scope,GamesAPIService){
        
        GamesAPIService.getGames().success(function(res){
            $scope.games = res.games
        })
        
        $scope.searchFilter = function(game){
            var keyword = new RegExp($scope.nameFilter,'i')
            return !$scope.nameFilter || keyword.test(game.objectname)
        }
    })
    .controller('GameController',function($scope,$routeParams,GamesAPIService){

    	$scope.id = $routeParams.id
    	$scope.game = null

    	GamesAPIService.getGame($scope.id).success(function(res){
    		$scope.game = res.game
    	})
    })