'use strict';

/**
 *  This factory returns data from the leaderboard demo service.
 *
 */
angular.module('trainApp')
    .factory('LeadersService', function($http, $timeout, $interval) {

    var SHOW_NUMBER_OF_USERS  = 8;    // not all may show onscreen based on media size
    var ALL_USERS_SCROLL_RATE = 1200; // duration between user scrolls in ms
    var POLLING_DEFAULT       = 5000; // default polling rate will be used if nothing was found or endpoint had error
    var REPS_PER_ROUND        = 20;   // multiplier to calculate total reps (assumption based on the data)
    var URL_LEADERS           = 'https://apis.trainheroic.com/public/leaderboard/468425';
    var MOCK                  = false;

    if(MOCK){
      URL_LEADERS = 'mock.json';
    }

    var url = function() {
      return URL_LEADERS;
    };

    //main data object built from $http call after formatting
    var leaderData = {title: '', instructions: '', users: []};

    //array of size SHOW_NUMBER_OF_USERS that tracks on-screen users in scroller
    var slidesAllUsers = [];

    // counter to maintain where we are in the list of users as we scroll through
    var userId = 0;

    /**
     * calculates total reps for all users based on numeric value of tests node * the workout description of 20 reps
     * Ex. a user had a tests value of ["6 (RX)"] -> 6 * 20 = 120
      * @param data
     */
    var totalReps = function(data){
      var total = 0;
      _.each(data, function(user){
        var userTest = user.tests[0];
        var rounds = userTest.substr(0,userTest.indexOf(' '));
        total += (rounds*REPS_PER_ROUND);
      });
      //console.log('total: '+total);
      return total;
    };

    // Return the rank as proper grammar, please. Ms DePalma would be pleased.
    var getRank = function(rank){
      var data = ''+rank;
      //console.log('evaluating: '+data);
      if(data==='12') { return '12th'; }
      if(data==='13') { return '13th'; }
      if(data.endsWith('1')) { return data+'st'; }
      if(data.endsWith('2')) { return data+'nd'; }
      if(data.endsWith('3')) { return data+'rd'; }
      else { return data+'th'; }
    };

    var currIndex = 0; //maintain id uniqueness

    /**
       Returned data is formatted as:
         {
           title: '',            (workoutTitle)
           instructions: '',     (test instructions from first test record, see note in README on data assumptions)
           users: [
               image: ''         (user.profileImg URL)
               text: ''          (user.userFirstName + ' ' + user.userLastInitial)
               rank: ''          (getRank(user.rank))
               tests: ''         (user.tests[0])
               id: currIndex++   (unique id)
           ]
         }
     */
    var format = function(data){
      // would need to follow-up on this JSON structure, it seemed like there COULD be multiple tests here
      leaderData.workoutTitle = data.workoutTitle;
      leaderData.instructions = data.tests[0].testInstructions;
      leaderData.totalReps = totalReps(data.results);
      console.log('retrieved '+ data.results.length+' users');

      leaderData.users = [];
      //format the user records a little better for consumption
      _.each(data.results, function(user){
        leaderData.users.push({
          image: user.profileImg,
          text: user.userFirstName + ' ' + user.userLastInitial,
          rank: getRank(user.rank), //TODO how to denote a tie? There seem to be many in the data
          tests: user.tests[0],
          id: currIndex++
        });
      });
    };

    // function polls for fresh data every X seconds, rebuilds user list
    var poller = function() {
      console.log('polling '+URL_LEADERS);
      $http.get(URL_LEADERS).then(function (r) {
        if(r.data){
          format(r.data);
        }
        // Poll again for fresh data once your scrolling list should be reaching its end
        // OR try again in the default if there was nothing found from the endpoint.
        var POLLING_INTERVAL = leaderData.users.length*ALL_USERS_SCROLL_RATE;
        $timeout(poller, POLLING_INTERVAL);
      },
      function(err){
        console.log(err);
        //try again in the default if there was nothing found from the endpoint.
        console.log('error retrieving data, retrying in '+POLLING_DEFAULT+'ms');
        $timeout(poller, POLLING_DEFAULT);
      });
    };
    poller();


    // Add a person to the visible stack of scrolling users.
    var addPerson = function() {
      if(userId==leaderData.users.length){
        // hit the end of the list, reset counter to add from beginning again');
        userId = 0;
      }
      slidesAllUsers.push(leaderData.users[userId]);
      userId++;
    };

    // Remove person from the end of the display list
    var personRemove = function(index) {
      slidesAllUsers.splice(index, 1);
    };

    // Shift user list by both adding and removing a user from the visible 'stack'
    var scrollList = function() {
      var stop = $interval(function() {
        if(slidesAllUsers.length>=SHOW_NUMBER_OF_USERS)
          personRemove();
        addPerson();
      }, ALL_USERS_SCROLL_RATE);
    };

    // Prime the all user slides after a brief pause to account for any service lag
    (function () {
      console.log('prime');
      $timeout(function(){
        _.times(SHOW_NUMBER_OF_USERS, function() {
          addPerson();
        });
        scrollList();
      }, 1000);
    })();


    return {
      data: leaderData,
      ALL_USERS_SCROLL_RATE: ALL_USERS_SCROLL_RATE,
      getRank: getRank, //don't need to expose this anymore since refactoring almost everything to here from controller but it's one of my few tests so it stays! ;)
      url: url, // just used to test
      slidesAllUsers: slidesAllUsers  //scrolling list of users
    };

});