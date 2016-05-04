'use strict';

/**
 * @ngdoc overview
 * @name trainApp
 * @description
 * # trainApp
 *
 * Main module of the application.
 */
angular
  .module('trainApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'LeaderboardCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

// kick off the data polling
angular.module('trainApp').run(function(LeadersService) {});
