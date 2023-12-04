'use strict'

const parseInput = input => {
    return input.split('\n').map(l => l.split(':')[1]).map(l => l.split('|').map(s => s.trim().replaceAll(/ +/g, ' ').split(' ')))
}

const solve = (isPart2, input) => {
    const cards = Array(input.length).fill(1)
    const part1 = input.reduce((acc, [targets, attempts], index) => {
        const correct = (attempts.filter(f => targets.includes(f))).length
        if (correct) acc += Math.pow(2, correct - 1)
        for (let i = 0; i < correct; i++) { cards[index + i + 1] += cards[index] }
        return acc
    }, 0)
    return isPart2 ? cards.reduce((acc, cur) => acc + cur, 0) : part1
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
