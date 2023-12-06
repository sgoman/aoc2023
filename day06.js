'use strict'

const parseInput = input => {
    const nums = input.split('\n').map(l => l.split(':')[1].trim().split(/\s+/).map(Number))
    return nums[0].map((n, i) => solve([n, nums[1][i]]))
}

const solve = ([time, dist]) => {
    let wins = 0, t = 0
    while(t++ < time) if ((time - t) * t > dist) wins++
    return wins
}

const part1 = input => parseInput(input).reduce((acc, cur) => acc * cur, 1)

const part2 = input => solve(input.split('\n').map(l => Number(l.split(':')[1].replaceAll(/\s+/g, ''))))

module.exports = { part1, part2 }
