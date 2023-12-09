'use strict'

const parseInput = input => input.split('\n').map(l => l.split(' ').map(Number))

const diffs = sequence => sequence.reduce((seq, cur, i, arr) => { if (i) seq.push(cur - arr[i - 1]); return seq }, [])

const solveSequence = (seq, isPart2) => {
    if (seq.every(e => e == 0)) return 0
    return isPart2 ? seq[0] - solveSequence(diffs(seq), isPart2) : seq[seq.length - 1] + solveSequence(diffs(seq), isPart2)
}

const solve = (isPart2, input) => input.reduce((total, seq) => total + solveSequence(seq, isPart2), 0)

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
