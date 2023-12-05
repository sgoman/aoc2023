'use strict'

const parseInput = input => input.split('\n\n').reduce((puzzle, block, blockId) => {
    if (blockId == 0) {
        puzzle.seeds = [... block.matchAll(/(\d+)/g)].map(s => Number(s[0]))
    } else {
        puzzle.maps.push(block.split('\n').slice(1).map(line => [... line.matchAll(/(\d+)/g)].map(n => Number(n[0]))))
    }
    return puzzle
}, {seeds: [], maps: []})

function* simpleGen(seeds) {
    for (const seed of seeds) yield seed
}

function* rangeGen(seeds) {
    for (let i = 0; i < seeds.length; i += 2) {
        for (let seed = seeds[i], l = seeds[i] + seeds[i + 1]; seed < l; seed++) yield seed
    }
}

const solve = (isPart2, input) => {
    let result = Infinity
    for (let seed of (isPart2) ? rangeGen(input.seeds) : simpleGen(input.seeds)) {
        for (const block of input.maps) {
            for (const [dest, source, len] of block) {
                if (seed >= source && seed < source + len) {
                    seed += dest - source
                    break
                }
            }
        }
        result = Math.min(seed, result)
    }
    return result
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
