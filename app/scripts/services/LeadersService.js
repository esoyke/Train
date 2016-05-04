'use strict';

/**
 *  This factory returns data from the leaderboard demo service.
 *  I'm returning packaged response 'slightly' altered, assigning the results object as 'users' and the program as 'meta'
 */
angular.module('trainApp')
    .factory('LeadersService', function($http, $timeout) {

    var leaderData = { meta: {}, users: 0 };
    var POLLING_INTERVAL = 10000; // 10 seconds seems more than often enough to update this leaderboard
    var URL_Leaders = 'https://apis.trainheroic.com/public/leaderboard/468425';
    var MOCK = true;

    // function polls for fresh data every X seconds
    var poller = function() {
      //I'm going to be away from the Internet for a while, copy the JSON for initial testing
      //TODO contruct a proper test incorporating this so we aren't dependent on the actual service later
      if(MOCK){
        console.log('polling mock data..');
        $http.get('mock.json').then(function (r) {
          leaderData.meta = r.data;
          leaderData.users = r.data.results;
          $timeout(poller, POLLING_INTERVAL);
        });
      }
      else {
        console.log('polling the leaderboard service..');
        $http.get(URL_Leaders).then(function (r) {
          leaderData.meta = r.data;
          leaderData.users = r.data.results;
          $timeout(poller, POLLING_INTERVAL);
        })
      }
  };
  poller();

  return {
    data: leaderData
  };

});