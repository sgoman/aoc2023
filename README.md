Advent of Code 2023 in JavaScript
=================================

These are my solutions to the daily challenges of adventofcode.com, provided in plain JavaScript using NodeJS and the NPM module advent-of-code.

Installation
------------

After cloning this repository, run "npm install" and make sure that the aoc file is executable.

Set an environment variable with the name "ADVENT_SESSION" and the value of "session=YOURSESSION-ID" (with YOURSESSION-ID being the session ID from the cookie on the adventofcode.com site after logging in). This enables fetching your personalized input from adventofcode.com.

To run part 2 of the first challenge with your own input, execute "./aoc 1 2 +" or "cat input1.txt | ./aoc 1 2 -" to provide an input file on standard in.

If you want to write a days challenge from scratch, issue "./aoc init 1" to generate a boilerplate file for day 1. You can change the boilerplate by editing the file dayTemplate.js.

The challenges
--------------

1. **[Trebuchet?!](day01.js)** Find the first and last digit in a number of strings. Part 2 makes you scan for "wordy" digits as well.
2. **[Cube Conundrum](day02.js)** Draw a number of red, green and blue cubes from a bag and make educated guesses about the number total number of cubes inside.
3. **[Gear Ratios](day03.js)** Find numbers adjacent to thingies. Any of them in part 1, only pairs touching a certain symbol on part 2.
4. **[Scratchcards](day04.js)** You thought you only had to score points by matching pairs in the first part, while part 2 drowns you in more of the same card if there are matches.
5. **[If You Give A Seed A Fertilizer](day05.js)** Yak shaving in the form of planting seeds. And the numbers increase in part 2 of course.
6. **[Wait For It](day06.js)** Racing impossible toy boats that need charging. Again, part 2 lets you work the same principle with larger numbers.
7. **[Camel Cards](day07.js)** Weird poker style game with cards of just one suit. First part features a simple scoring mechanic, part 2 has one type of card become a match-all kind.
8. **[Haunted Wasteland](day08.js)** Navigate a graph from AAA to ZZZ in part one and all the \*A nodes to all the \*Z nodes in part 2.
9. **[Mirage Maintenance](day09.js)** In part 1 you will get to know a useful algorithm to continue a series of numbers. Part 2 lets you use a variant of that algo to find a preceeding number.
10. **[Pipe Maze](day10.js)** Title, nuff said. At least for the first part. Part 2 has you finding all tiles in the maze that are enclosed by the pipe loop.
11. **[Cosmic Expansion](day11.js)** You get a map of galaxies and have to calculate the distance between pairs of each after expanding the map to double the space at certain points. Part 2 expands to a million times each!
12. **[Hot Springs](day12.js)** Find possible group layouts in a pattern. You get 5 times the input with additional wildcards in part 2.
13. **[Point of Incidence](day13.js)** Horizontal or vertical Rorschach tests. Part 2 relies on finding one imperfection in each test.
14. **[Parabolic Reflector Dish](day14.js)** Multi ball tilting marble labyrinth. Tilt to each direction in turn once for part 1 and 1e9 times for part2.
15. **[Lens Library](day15.js)** Part 1 teaches you a hash function, part 2 explains the input code and lets you use the hash function to determine which lens to put into which box or take them out instead.
16. **[The Floor Will Be Lava](day16.js)** Find the number of tiles under a laser beam bounced around with mirrors and splitters. Fixed position in part 1, while you can chose any tile on the border for part 2.
17. **[Clumsy Crucible](day17.js)** Least cost routing a hight map with the constraint to only take three successive steps in the same direction in part 1. Part 2 gives you a different max steps, but also adds a minimum amount of steps before you are allowed to tun.
18. **[Lavaduct Lagoon](day18.js)** Follow the instructions to dig a looping trench and expand it into a pool afterwards. Part 2 blows those instructions to wild dimensions.
19. **[Aplenty](day19.js)** Part 1 teaches you how to apply the instructions in the input to a set of values. Part 2 makes you find all possible inputs to those instructions in a given range.
20. **[Pulse Propagation](day20.js)** We are implementing a digital circuit. Part 1 just tests if you implemented each part correctly, part 2 has you find the number of ticks the simulation has to run for a certain outcome.
21. **[Step Counter](day21.js)** A twist to path finding, but easy for part 1. In part 2 the maze repeats initely and you have to find out how many spaces you can reach after millions of steps.
22. **[Sand Slabs](day22.js)** A game of Jenga under quirky constraints. Part 1 plays it safe and only lets you remove blocks that don't effect others while part 2 goes for maximum damage.
23. **[A Long Walk](day23.js)** Find the longest path through a maze. Easy on part 1, where each split in the path is secured by one way passages. But those restrictions are ignored in part 2, which might be harder than it sounds at first.
24. **[Never Tell Me The Odds](day24.js)** Velocity vectors at points in space. Part 1 is restricted to 2D space and just asks for intersecting paths, while part 2 goes full 3D and aks to find the point in time where the paths of all particles align.
25. **[Snowverload](day25.js)** Grouping nodes in a graph to split them in two by cutting three edges. Trivial if you had access to networkx, otherwise not so much... You could also get lucky and have GraphViz load your input, but I wasn't.
