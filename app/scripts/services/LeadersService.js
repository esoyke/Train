'use strict';

/**
 *  This factory returns data from the leaderboard demo service.
 *  I'm returning packaged response 'slightly' altered, assigning the results object as 'users' and the program as 'meta'
 */
angular.module('trainApp')
    .factory('LeadersService', function($http, $timeout) {

    var leaderData = { meta: {}, users: 0 };
    var ALL_USERS_SCROLL_RATE = 400; //ms
    var POLLING_DEFAULT = 3000; // default polling rate will be used if nothing was found
    var URL_Leaders = 'https://apis.trainheroic.com/public/leaderboard/468425';
    var MOCK = true;
    //TODO contruct a proper test dammit
    if(MOCK){
      console.log('polling mock data..');
      URL_Leaders = 'mock.json';
    }
    // function polls for fresh data every X seconds
    var poller = function() {
        $http.get(URL_Leaders).then(function (r) {
          leaderData.meta = r.data;
          leaderData.users = r.data.results;
          console.log('retrieved '+leaderData.users.length+' users')
          // Poll again for new data once your scrolling list should be reaching its end
          // OR try again in the default if there was nothing found.
          // Seems slightly cheesy to me but I've been coding all freaking day at this point and am seeing stars.
          var POLLING_INTERVAL = leaderData.users.length*ALL_USERS_SCROLL_RATE;
          $timeout(poller, POLLING_INTERVAL || POLLING_DEFAULT);
        });
    };
    poller();

  return {
    data: leaderData,
    ALL_USERS_SCROLL_RATE: ALL_USERS_SCROLL_RATE
  };

});