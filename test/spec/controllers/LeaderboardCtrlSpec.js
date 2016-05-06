'use strict';

describe('Controller: LeaderboardCtrl', function () {

  // load the controller's module
  beforeEach(module('trainApp'));

  var LeaderboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
      LeaderboardCtrl = $controller('LeaderboardCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // just an initial test to see we can get the Controller
  it('should attach a list of testing array to the scope', function () {
    expect(LeaderboardCtrl.testing.length).toBe(3);
  });

  // TODO - Mea culpa: These are just bare bones tests, I need to cover more I know, I know.
  // I wanted to write more but my family and I are about to leave for our semi-annual
  // camping trip, where I will be out of Internet world for the next couple days, and
  // my clock has run out. Rather than look like I was just sitting on this project
  // forever I wanted to get it to you to show my progress over the past two days.
  //
  // Your challenge states you are test-driven environment and I don't want to give the
  // impression I would ignore this, it's only that my style under pressure isn't usually
  // to write tests first but rather to think, tinker, code, test every scenario I can think
  // of, then include actual written tests before moving on.

});
