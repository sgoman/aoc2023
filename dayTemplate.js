'use strict'

const parseInput = input => {
    return input.split('\n')
}

const solve = (isPart2, input) => {
    return input
}

const part1 = input => {
  return solve(false, parseInput(input))
}

const part2 = input => {
  return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
