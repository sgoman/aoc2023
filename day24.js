'use strict'

const parseInput = input => input.replace(/@/g, ',').split('\n').map(l => l.split(',').map(v => Number(v.trim())))

const MIN = 200000000000000, MAX = 400000000000000

const pairs = (arr) => arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat()

const intersects = (a, b, c, d, p, q, r, s) => {
    const det = (c- a) * (s - q) - (r - p) * (d - b)
    if (det == 0) return null
    return ((s - q) * (r - a) + (p -r) * (s - b)) / det
}

const solve = (isPart2, input) => pairs(input).reduce((acc, [a, b]) => {
    const delta = intersects(a[0], a[1], a[0] + a[3], a[1] + a[4], b[0], b[1], b[0] + b[3], b[1] + b[4])
    if (delta == null) return acc
    const x = a[0] + delta * a[3]
    const y = a[1] + delta * a[4]
    if ((x < a[0] && a[3] > 0) || (x > a[0] && a[3] < 0) || (x < b[0] && b[3] > 0) || (x > b[0] && b[3] < 0)) return acc
    if (x < MIN || x > MAX || y < MIN || y > MAX) return acc
    return acc + 1
}, 0)

const part1 = input => solve(false, parseInput(input))

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
