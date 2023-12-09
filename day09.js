'use strict'

const parseInput = input => input.split('\n').map(l => l.split(' ').map(Number))

const solveSequence = (seq, isPart2) => {
    if (seq.every(e => e == 0)) return 0

    const s = [], l = seq.length - 1
    for (let i = 0; i < l; i++) s.push(seq[i + 1] - seq[i])
    return isPart2 ? seq[0] - solveSequence(s, isPart2) : seq[l] + solveSequence(s, isPart2)
}

const solve = (isPart2, input) => input.reduce((total, seq) => total +  solveSequence(seq, isPart2), 0)

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
