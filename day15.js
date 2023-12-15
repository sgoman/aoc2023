'use strict'

const parseInput = input => input.trim().split(',').map(l => l.split('').reduce((acc, c) => (((acc + c.charCodeAt(0)) * 17) % 256), 0))

const part1 = input => parseInput(input).reduce((acc, cur) => acc + cur, 0)

const part2 = input => {
    return parseInput(input)
}

module.exports = { part1, part2 }
