'use strict'

const parseInput = input => [
    input.split('\n\n')[0],
    input.split('\n\n')[1].split('\n').map(l => l.match(/[A-Z]+/g).slice(0, 3)).reduce((acc, [k, l, r]) => { acc[k] = [l, r]; return acc }, {}) // no matchAll
]

const solve = ([dirs, nodes], loc) => {
    const l = dirs.length
    let s = 0
    while (loc[2] != 'Z') loc = nodes[loc][1 * (dirs[1 * (s++ % l)] == 'R')]
    return s
}

// Thanks, SO 47047682
const gcd = (a, b) => a ? gcd(b % a, a) : b

const lcm = (a, b) => a * b / gcd(a, b)

const part1 = input => solve(parseInput(input), 'AAA')

const part2 = input => {
    const [dirs, nodes] = parseInput(input)
    return Object.keys(nodes).filter(f => f[2] == 'A').map(loc => solve([dirs, nodes], loc)).reduce(lcm)
}

module.exports = { part1, part2 }
