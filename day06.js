'use strict'

const parseInput = input => {
    const nums = input.split('\n').map(l => l.split(':')[1].trim().split(/\s+/).map(Number))
    return nums[0].map((n, i) => solveMath([n, nums[1][i]])).reduce((acc, cur) => acc * cur, 1)
}

const solveLoop = ([time, dist]) => {
    let wins = 0, t = 0
    while(t++ < time) if ((time - t) * t > dist) wins++
    return wins
}

const solveMath = ([time, dist]) => {
    const root = Math.sqrt(Math.pow(time, 2) - 4 * (dist + 1))
    return Math.floor((time + root) / 2) - Math.ceil((time - root) / 2) + 1
}

const part1 = input => parseInput(input)

const part2 = input => parseInput(input.replaceAll(/ +/g, ''))

module.exports = { part1, part2 }
