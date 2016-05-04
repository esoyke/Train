'use strict';

/**
 *  This factory returns data from the leaderboard demo service.
 *  I'm returning packaged response 'slightly' altered, assigning the results object as 'users' and the program as 'meta'
 */
angular.module('trainApp')
    .factory('LeadersService', function($http, $timeout) {

    var leaderData = { meta: {}, users: 0 };
    var POLLING_INTERVAL = 10000; // 10 seconds seems more than often enough to update this leaderboard

    var poller = function() {
    console.log('polling the leaderboard service..');
    $http.get('https://apis.trainheroic.com/public/leaderboard/468425').then(function(r) {
      leaderData.meta = r.data;
      leaderData.users = r.data.results;
      $timeout(poller, POLLING_INTERVAL);
    });

  };
  poller();

  return {
    data: leaderData
  };
});


/*
 angular.module('trainApp')
 .factory('LeadersService', ['$http', '$q', function($http, $q) {

 var leadersURL = 'https://apis.trainheroic.com/public/leaderboard/468425';
 var TIMEOUT = 5000;
 var leaders = [];

 return {

 getLeaders: function (data) {
 var async = $q.defer();
 $http({method: 'GET', url: leadersURL, data: data, timeout: TIMEOUT }).

 success(function(data, status, headers, config) {
 leaders = data;
 //console.log(leaders.results);
 async.resolve();
 }).
 error(function(data, status, headers, config) {
 async.reject({ status: status, data: data });
 }
 );
 return async.promise;
 }

 };

 }]);
 */
