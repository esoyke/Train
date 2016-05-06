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

      var SHOW_NUMBER_OF_USERS = 5;

      // data is refreshed in service for you automatically
      $scope.leaderData = LeadersService.data;

      $rootScope.slidesAllUsers = [];

      //maintain id uniqueness
      var currIndex = 0;

      // counter to maintain where we are in the list of users as we scroll through
      $rootScope.userId = 0;

      // Add a person to the visible stack of scrolling users.
      // blah, the need for rootScope to call from within the interval function is
      // probably due to a scoping mistake on my part. Might fix with a closure later to make it less hackish
      // as anytime I find myself using rootScope I figure I'm doing something wrong...
      $rootScope.addPerson = function() {
        if($rootScope.userId==$scope.leaderData.users.length){
          // hit the end of the list, reset counter to add from beginning again');
          $rootScope.userId = 0;
        }
        $rootScope.slidesAllUsers.push($scope.leaderData.users[$rootScope.userId]);
        $rootScope.userId++;
      };

      // Remove person from the end of the display list
      // same goes here with regard to rootScope
      $rootScope.personRemove = function(index) {
        $rootScope.slidesAllUsers.splice(index, 1);
      };

      // Shift user list by both adding and removing a user from the visible 'stack'
      $scope.scrollList = function($scope) {
        var stop = $interval(function($scope) {
          $rootScope.addPerson();
          if($rootScope.slidesAllUsers.length>SHOW_NUMBER_OF_USERS)
            $rootScope.personRemove();
        }, LeadersService.ALL_USERS_SCROLL_RATE);
      };

      //prime the all user slides after a brief pause to account for any service lag
      (function () {
        $timeout(function(){
          _.times(SHOW_NUMBER_OF_USERS, function() {
            $rootScope.addPerson();
          });
          $scope.scrollList();
        }, 1000);

      })();

    }
]);
