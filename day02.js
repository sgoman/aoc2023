'use strict'

const parseInput = input => input.split('\n').map(line => {
        const [game, cubes] = line.replace('Game ', '').split(':')
        const reveals = cubes.split(';').map(rev => [... rev.matchAll(/(?<amount>\d+) (?<color>green|red|blue)/g)].map(e => {
                const {amount, color} = e.groups
                return {amount: 1 * amount, color}
            })
        )
        return {game: 1 * game, reveals}
    })

const maxColors = {red: 12, green: 13, blue: 14}

const solve = (isPart2, input) => input.reduce((result, {game, reveals}) => {
        let valid = true
        const peaks = {red: 0, green: 0, blue: 0}
        for (const reveal of reveals) {
            for (const {amount, color} of reveal) {
                if (amount > maxColors[color]) valid = false
                if (amount > peaks[color]) peaks[color] = amount
            }
        }
        return result + ((isPart2) ? peaks.red * peaks.green * peaks.blue : valid * game)
    }, 0)

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
