Advent of Code 2023 in JavaScript
=================================

These are my solutions to the daily challenges of adventofcode.com, provided in plain JavaScript using NodeJS and the NPM module advent-of-code.

Installation
------------

After cloning this repository, run "npm install" and make sure that the aoc file is executable.

Set an environment variable with the name "ADVENT_SESSION" and the value of "session=YOURSESSION-ID" (with YOURSESSION-ID being the session ID from the cookie on the adventofcode.com site after logging in). This enables fetching your personalized input from adventofcode.com.

To run part 2 of the first challenge with your own input, execute "./aoc 1 2 +" or "cat input1.txt | ./aoc 1 2 -" to provide an input file on standard in.

If you want to write a days challenge from scratch, issue "./aoc init 1" to generate a boilerplate file for day 1. You can change the boilerplate by editing the file dayTemplate.js.
