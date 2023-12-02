'use strict'

const parseInput = input => {
    const result = []
    input.split('\n').forEach(line => {
        const [game, cubes] = line.replace('Game ', '').split(':')
        const reveals = cubes.split(';').map(rev => {
            const res = [... rev.matchAll(/(?<amount>\d+) (?<color>green|red|blue)/g)].map(e => {
                const {amount, color} = e.groups
                return {amount: 1 * amount, color}
            })
            // console.log(res)
            return res
        })
        // console.log({game: 1 * game, reveals})
        result.push({game: 1 * game, reveals})
    })
    return result
}

const solve = (isPart2, input) => {
    const maxColors = {red: 12, green: 13, blue: 14}
    let result = 0
    for (const {game, reveals} of input) {
        let valid = true
        const peaks = {red: 0, green: 0, blue: 0}
        for (const reveal of reveals) {
            for (const {amount, color} of reveal) {
                if (amount > maxColors[color]) valid = false
                if (amount > peaks[color]) peaks[color] = amount
            }
        }
        if (valid && !isPart2) result += game
        if (isPart2) result += peaks.red * peaks.green * peaks.blue
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
