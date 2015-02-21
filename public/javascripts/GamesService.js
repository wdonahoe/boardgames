'use strict'

angular.module('BoardGame.services',[])
    .factory('GamesAPIService',function($http){
        
        var gameAPI = {}
        
        gameAPI.getGames = function(){
            return $http.get('/api/games')
        }
        gameAPI.getGame = function(id){
            return $http.get('/api/games/' + id)
        }
        gameAPI.getRandom = function(n){
            return $http.get('/api/games/random/' + n)
        }
        
        return gameAPI
        
    })