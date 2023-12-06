'use strict'

const parseInput = input => {
    const nums = input.split('\n').map(l => l.split(':')[1].trim().split(/\s+/).map(Number))
    return nums[0].map((n, i) => [n, nums[1][i]])
}

const solve = (isPart2, input) => {
    const races = input.reduce((acc, [time, dist]) => {
        let t = 0
        const wins = []
        while(t++ < time) {
            const d = (time - t) * t
            if (d > dist) wins.push({t, d})
        }
        acc.push(wins)
        return acc
    }, [])
    if (!isPart2) {
        return races.reduce((acc, cur) => acc * cur.length, 1)
    }
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    const [time, dist] = input.split('\n').map(l => Number(l.split(':')[1].replaceAll(/\s+/g, '')))
    let wins = 0
    let t = 0
    while(t++ < time) if ((time - t) * t > dist) wins++
    return wins
}

module.exports = { part1, part2 }
