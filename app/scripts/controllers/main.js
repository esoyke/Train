'use strict';

/**
 * @ngdoc function
 * @name trainApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainApp
 */
angular.module('trainApp')
  .controller('LeaderboardCtrl', ['$scope', 'LeadersService', function ($scope, LeadersService) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        $scope.leaders = LeadersService.data;
        $scope.topten = _.first(LeadersService.data.users, 10);
        //$scope.topten = _.first($scope.leaders.users, 10);

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        //$scope.active = 0;
        $scope.slidesTopTen = [];
        $scope.slidesAllUsers = [];

      var currIndex = 0;

        // top 10 folks
        $scope.addslidesTopTen = function() {
          $scope.slidesTopTen = [];
          _.each($scope.topten, function(user) {
            $scope.slidesTopTen.push({
              image: user.profileImg,
              text: user.userFirstName + ' ' + user.userLastInitial,
              rank: user.rank, //TODO how to denote a tie? There seem to be many in the data
              id: currIndex++
            })
          });
        };

        // everybody
        $scope.addslidesAllUsers = function() {
          $scope.slidesAllUsers = [];
          _.each($scope.topten, function(user) {
            $scope.slidesAllUsers.push({
              image: user.profileImg,
              text: user.userFirstName + ' ' + user.userLastInitial,
              rank: user.rank, //TDO how to denote a tie?
              id: currIndex++
            })
          });
        };

        $scope.addslidesTopTen();
        $scope.addslidesAllUsers();

    }
]);
