# Train Leaderboard demo
This app polls for live workout info from https://apis.trainheroic.com/public/leaderboard/468425 and displays the rankings.

Clone and get up and running:
```
  npm install
  bower install
  grunt serve
```

## Stack
  * Angular (templated by Yeoman)
  * Bootstrap, naturally
  * CSS, plain vanilla
  * Angular-ui, for the top-ten slide carousel
  * Underscore, for some array utils
  * Grunt, to serve it up
  * SVG, for leader podium

## Polling and user display
It is polling for new data once it reaches the time calculated it will reach the end of the user display. Displaying just
5 at a time for greater visibility from say, across a room.


## Tradeoffs
As the specs specifically said this would be displayed non-interactively on a large 48" screen, I took the following liberties
to speed up development:
  * Didn't bother to concat/minify as this would be loaded just once and there was no potential gain
  * Didn't test on anything but Chrome as there probably wouldn't be a need to support multiple browsers
  * Didn't specify any @media breaks or test on anything other than a large screen
  * Used absolute positioning for leader podium, both the images and SVG. Looks fine on my full screen but could get
  screwy fast on a smaller screen

## Issues
Ran into a problem calling add/remove functions within the $interval when scrolling the users, and resorted to using
$rootScope. While it's working at present I usually consider $rootScope to mean I made a scoping mistake. Possibly it
could be addressed with closures. Being under the gun I opted to note it, move on, and address it later.

Also still need to write some darn tests...

## Notes on the data:
Did my best to understand the structure of the data. I was finding a single test (though it was in an array), so decided
to display that test and the users' results array. The results array was not embedded in the tests so there didn't seem
to be a real relationship there that I could see. If this was a misunderstanding on my part and there could actually be
multiple tests with multiple result sets, it would obviously need to be refactored to perhaps scroll through each test
and the associated users.

Also the avgRank always equalled the rank, so I essentially ignored it. If this was just a quirk of the data, it would
be a good idea to show a 'Most Improved' indicator.

In calculating the total reps, based on the workout description:
'Record total number of reps completed in 5 minutes. Each round has 20 reps.'
I made the assumption that a user with a test node with value of ["6 (RX)"] would indicate they did 6 * 120 = 720 reps.
I could be totally offboard but that's what I went with. Kind of suspicious this may be wrong as the leader at the time
had 100 (RX), thus 1200. Maybe this calculation is correct and he's simply a monster.

P.S. It was pretty funny that the image I grabbed at random from the test data to initially verify the pics were OK
happened to be the guys from Dumb and Dumber. :)