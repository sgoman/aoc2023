'use strict'

const { init } = require('z3-solver')

const parseInput = input => input.replace(/@/g, ',').split('\n').map(l => l.split(',').map(v => Number(v.trim())))

const MIN = 200000000000000, MAX = 400000000000000

const pairs = (arr) => arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat()

const intersects = (a, b, c, d, p, q, r, s) => {
    const det = (c- a) * (s - q) - (r - p) * (d - b)
    if (det == 0) return null
    return ((s - q) * (r - a) + (p -r) * (s - b)) / det
}

const solve = input => pairs(input).reduce((acc, [a, b]) => {
    const delta = intersects(a[0], a[1], a[0] + a[3], a[1] + a[4], b[0], b[1], b[0] + b[3], b[1] + b[4])
    if (delta == null) return acc
    const x = a[0] + delta * a[3]
    const y = a[1] + delta * a[4]
    if ((x < a[0] && a[3] > 0) || (x > a[0] && a[3] < 0) || (x < b[0] && b[3] > 0) || (x > b[0] && b[3] < 0)) return acc
    if (x < MIN || x > MAX || y < MIN || y > MAX) return acc
    return acc + 1
}, 0)

const solve2 = async input => {
    const { Context } = await init()
    const { Solver, Int } = new Context('main')
    const solver = new Solver()
    const x = Int.const('x')
    const y = Int.const('y')
    const z = Int.const('z')
    const dx = Int.const('dx')
    const dy = Int.const('dy')
    const dz = Int.const('dz')
    const t = input.map((_, i) => Int.const(`t${i}`))

    input.forEach((h, i) => {
        solver.add(t[i].mul(h[3]).add(h[0]).sub(x).sub(t[i].mul(dx)).eq(0))
        solver.add(t[i].mul(h[4]).add(h[1]).sub(y).sub(t[i].mul(dy)).eq(0))
        solver.add(t[i].mul(h[5]).add(h[2]).sub(z).sub(t[i].mul(dz)).eq(0))
    })

    await solver.check()

    return Number(solver.model().eval(x.add(y).add(z)).value())
}

const part1 = input => solve(parseInput(input))

const part2 = input => solve2(parseInput(input).slice(0, 3))

module.exports = { part1, part2 }
