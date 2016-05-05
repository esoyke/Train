'use strict';

/**
 * @ngdoc function
 * @name trainApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainApp
 */
angular.module('trainApp')
  .controller('LeaderboardCtrl', ['$scope', '$rootScope', '$interval', '$timeout', 'LeadersService', function ($scope, $rootScope, $interval, $timeout, LeadersService) {

      var SHOW_NUMBER_OF_USERS = 9;

      $scope.leaders = LeadersService.data;
      $scope.topten = _.first(LeadersService.data.users, 10);

      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;
      //$scope.active = 0;
      $scope.slidesTopTen = [];
      $rootScope.slidesAllUsers = [];

      var currIndex = 0;

      // Return the rank as proper grammar, please. Ms Garlick would be pleased.
      var getRank = function(rank){
        var data = ''+rank;
        if(data=='12')
          return '12th';
        if(data=='13')
          return '13th';
        if(data.endsWith('1'))
          return data+'st';
        if(data.endsWith('2'))
          return data+'nd';
        if(data.endsWith('3'))
          return data+'rd';
        else
          return data+'th';
      };

      // top 10 folks
      $scope.addslidesTopTen = function() {
        $scope.slidesTopTen = [];
        _.each($scope.topten, function(user) {
          $scope.slidesTopTen.push({
            image: user.profileImg,
            text: user.userFirstName + ' ' + user.userLastInitial,
            rank: getRank(user.rank), //TODO how to denote a tie? There seem to be many in the data
            id: currIndex++
          })
        });
      };

      // counter to maintain where we are in the list of users as we scroll through
      $rootScope.userId = 0;

      // blah, the need for rootScope to call from within the interval function is
      // probably due to a scoping mistake on my part. Might fix with a closure later to make it less hackish
      // as anytime I find myself using rootScope I figure I'm doing something wrong...
      $rootScope.addPerson = function() {
        console.log('addPerson '+$rootScope.userId);
        if($rootScope.userId==$scope.leaders.users.length){
          console.log('hit the end of the list, TODO- should reload here and reset counter');
          $rootScope.userId = 0;
        }
        var user = $scope.leaders.users[$rootScope.userId];
        $rootScope.slidesAllUsers.push({
          image: user.profileImg,
          text: user.userFirstName + ' ' + user.userLastInitial,
          rank: getRank(user.rank), //TODO how to denote a tie? There seem to be many in the data
          id: currIndex++
        });
        $rootScope.userId++;
      };

      // same goes here
      $rootScope.personRemove = function(index) {
        $rootScope.slidesAllUsers.splice(index, 1);
      };

      // add and remove a user from the visible 'stack'
      $scope.scrollList = function($scope) {
        var stop = $interval(function($scope) {
          $rootScope.addPerson();
          if($rootScope.slidesAllUsers.length>SHOW_NUMBER_OF_USERS)
            $rootScope.personRemove();
        }, LeadersService.ALL_USERS_SCROLL_RATE);
      };
      $scope.scrollList();



      //prime the all user slides after a brief pause to allow for any service lag
      (function () {
        $timeout(function(){
          console.log('go!');
          // populate the top ten slideshow
          $scope.addslidesTopTen();

          for (var i = 0; i < SHOW_NUMBER_OF_USERS; i++) {
            $rootScope.addPerson();
          };
        }, 3000);

      })();

    }
]);
