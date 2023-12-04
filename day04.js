'use strict'

const parseInput = input => input.split('\n').map(l => l.split(':')[1]).map(l => l.split('|').map(s => s.trim().split(/\s+/)))

const solve = (isPart2, input) => {
    const cards = Array(input.length).fill(1)
    const part1 = input.reduce((acc, [targets, attempts], index) => {
        let correct = (attempts.filter(f => targets.includes(f))).length
        if (correct) acc += Math.pow(2, correct - 1)
        while(correct) cards[index + correct--] += cards[index]
        return acc
    }, 0)
    return isPart2 ? cards.reduce((acc, cur) => acc + cur, 0) : part1
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
