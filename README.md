# Train Leaderboard demo
This app polls for live workout info from https://apis.trainheroic.com/public/leaderboard/468425 and displays the
rankings in a scrolling list, as well as the top three people in a leader's podium, and some summary info on
participants and total reps.

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
  * ~~Angular-ui, for the top-ten slide carousel~~ Replaced with podium
  * Underscore, for some array utils
  * Grunt, to serve it up
  * Karma/Jasmine, for my admittedly sparse tests
  * SVG, for leader podium

## Polling and user display
It is polling for new data once it reaches the time calculated it will reach the end of the user display scroll. It's
displaying just 5 at a time for greater visibility from say, across a room or gym. If the endpoint errors or returns
nothing it retries in a given number of seconds. I'd still like to enhance it to scroll with more smoothness, adding
some ease transitions perhaps.

## Other Design decisions
I tried to maintain a similar feel to the TrainHeroic site, such as fonts and colors, and the circle-clipped user images.
Also came up with a podium in the spirit of the original site and snuck in your logo.

## Tradeoffs
As the specs specifically said this would be displayed non-interactively on a large 48" screen, I took the following
liberties to speed up development:
  * Didn't bother to concat/minify as this would be loaded just once and there was no potential gain
  * Didn't test on anything but Chrome as there probably wouldn't be a need to support multiple browsers
  * Didn't specify any @media breaks or test on anything other than a large screen
  * Used absolute positioning for leader podium, both the images and SVG. Looks fine on my full screen but could get
  screwy fast on a smaller screen

## Issues
Ran into a problem calling add/remove functions within the $interval when scrolling the users, and resorted to using
$rootScope. While it's working fine at present I usually consider $rootScope to mean I made a scoping mistake. Possibly
it could be addressed with closures. Being under the gun I opted to note it, move on, and address it later.

Mea culpa: These are just bare bones tests, I need to cover more I know, I know. I wanted to write more but my family
and I are about to leave for our semi-annual camping trip, where I will be out of Internet world for the next couple
days, and my clock has run out. Rather than look like I was just sitting on this project forever I wanted to get it to
you to show my progress over the past two days.

Your challenge states you are test-driven environment and I don't want to give the  impression I would ignore this, it's
only that my style under pressure isn't usually to write tests first but rather to think, tinker, code, test every
scenario I can think of, then include actual written tests before moving on.


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
I made the assumption that a user with a test node with value of ["6 (RX)"] would indicate they did 6 * 20 = 120 reps.
I could be totally offboard but that's what I went with. Kind of suspicious this may be wrong as the leader at the time
had 100 (RX), thus 1200. Maybe this calculation is correct and he's simply a monster.

P.S. It was pretty funny that the image I grabbed at random from the test data to initially verify the pics were OK
happened to be the guys from Dumb and Dumber. :)