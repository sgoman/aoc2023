'use strict'

const parseInput = input => input.split('\n')
    .map(line => {
        const [game, cubes] = line.replace('Game ', '').split(':')
        const peaks = [... cubes.matchAll(/(?<amount>\d+) (?<color>green|red|blue)/g)].map(e => {
                const {amount, color} = e.groups
                return {amount: 1 * amount, color}
            }).reduce((acc, {amount, color}) => {
                if (amount > acc[color]) acc[color] = amount
                return acc}, {red: 0, green: 0, blue: 0})
        return {game: 1 * game, peaks}
    })

const part1 = input => parseInput(input)
    .filter(({peaks}) => peaks.red <= 12 && peaks.green <= 13 && peaks.blue <= 14)
    .reduce((acc, {game}) => acc + game, 0)

const part2 = input => parseInput(input)
    .reduce((acc, {peaks}) => acc + peaks.red * peaks.green * peaks.blue, 0)

module.exports = { part1, part2 }
