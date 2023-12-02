'use strict'

const substitutions = [
    { s: "one", r: "o1e" },
    { s: "two", r: "t2o" },
    { s: "three", r: "t3e" },
    { s: "four", r: "4" },
    { s: "five", r: "5e" },
    { s: "six", r: "6" },
    { s: "seven", r: "7n" },
    { s: "eight", r: "e8t" },
    { s: "nine", r: "n9e" }
]

const solve = (isPart2, input) => input
    .split('\n')
    .map(line => {
        if (isPart2) substitutions.forEach(sub => line = line.replaceAll(sub.s, sub.r))
        return line.replaceAll(/\D/g, '')
    })
    .map(line => 1 * (line[0] + line[line.length - 1]))
    .reduce((acc, cur) => acc += cur, 0)

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
