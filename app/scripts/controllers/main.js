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

      // just to test the controller available
      this.testing = [
        'One',
        'Two',
        'Three'
      ];

      // Moved most everything to the service instead, better modularity, no need for rootScope hack anymore
      $scope.leaderData = LeadersService.data;
      $scope.slidesAllUsers = LeadersService.slidesAllUsers;

    }
]);

angular.module('trainApp').animation('.scroll-animation', ['LeadersService', '$animateCss', function(LeadersService, $animateCss) {
  return {
    enter: function(element, doneFn) {
      var height = element[0].offsetHeight;
      return $animateCss(element, {
        addClass: 'large-text',
        easing: 'ease-out',
        from: { height:'0px' },
        to: { height:height + 'px' },
        duration: LeadersService.ALL_USERS_SCROLL_RATE/1000 //(scroll rate is in ms, but duration here in in seconds
      });
    }
  }
}]);