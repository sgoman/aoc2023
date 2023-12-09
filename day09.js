'use strict'

const parseInput = input => {
    return input.split('\n').map(l => l.split(' ').map(Number))
}

const solveSequence = (seq, prev) => {
    if (seq.every(e => e == 0)) return 0

    const s = [], l = seq.length - 1
    for (let i = 0; i < l; i++) s.push(seq[i + 1] - seq[i])
    return seq[l] + solveSequence(s, seq)
}

const solve = (isPart2, input) => input.reduce((total, seq) => total +  solveSequence(seq, [0]), 0)

const part1 = input => solve(false, parseInput(input))

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
