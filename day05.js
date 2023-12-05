'use strict'

const parseInput = input => input.split('\n\n').reduce((puzzle, block, blockId) => {
    if (blockId == 0) {
        puzzle.seeds = [... block.matchAll(/(\d+)/g)].map(s => Number(s[0]))
    } else {
        puzzle.maps.push(block.split('\n').slice(1).map(line => [... line.matchAll(/(\d+)/g)].map(n => Number(n[0]))))
    }
    return puzzle
}, {seeds: [], maps: []})

const solve = (isPart2, input) => {
    const results = []
    for (let seed of input.seeds) {
        for (const block of input.maps) {
            for (const [dest, source, len] of block) {
                if (seed >= source && seed < source + len) {
                    seed += dest - source
                    break
                }
            }
        }
        results.push(seed)
    }
    return Math.min(...results)
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
