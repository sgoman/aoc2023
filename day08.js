'use strict'

const parseInput = input => [
    input.split('\n\n')[0],
    input.split('\n\n')[1].split('\n').map(l => [...l.matchAll(/([A-Z]{3})/g)]).reduce((acc, cur) => { acc[cur[0][1]] = [cur[1][1], cur[2][1]]; return acc }, {})
]

const solve = (isPart2, [dirs, nodes]) => {
    const l = dirs.length
    let s = 0
    let loc = 'AAA'
    while (loc != 'ZZZ') loc = nodes[loc][1 * (dirs[1 * (s++ % l)] == 'R')]
    return s
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
