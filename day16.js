'use strict'

const process = {
    '.': [[[-1, 0, 0]], [[0, 1, 1]], [[1, 0, 2]], [[0, -1, 3]]],
    '/': [[[0, 1, 1]], [[-1, 0, 0]], [[0, -1, 3]], [[1, 0, 2]]],
    '\\': [[[0, -1, 3]], [[1, 0, 2]], [[0, 1, 1]], [[-1, 0, 0]]],
    '-': [[[0, -1, 3], [0, 1, 1]], [[0, 1, 1]], [[0, -1, 3], [0, 1, 1]], [[0, -1, 3]]],
    '|': [[[-1, 0, 0]], [[-1, 0, 0], [1, 0, 2]], [[1, 0, 2]], [[-1, 0, 0], [1, 0, 2]]]
}

const parseInput = input => input.split('\n').map(l => l.split(''))

const solve = (grid, beamRow, beamCol, beamDir) => {
    const onGrid = (r, c) => r >= 0 && r < grid.length && c >= 0 && c < grid[0].length
    const visited = new Set(), repeated = new Set()
    const beams = [[beamRow, beamCol, beamDir]]
    while(beams.length) {
        const [row, col, dir] = beams.shift()
        const pos = '' + row + '-' + col
        const state = pos + dir
        if (repeated.has(state)) {
            continue
        } else {
            repeated.add(state)
        }
        visited.add(pos)
        for (const [nr, nc, nd] of process[grid[row][col]][dir])
            if (onGrid(row + nr, col + nc)) beams.push([row + nr, col + nc, nd])
    }
    return visited.size
}

const part1 = input => solve(parseInput(input), 0, 0, 1)

const part2 = input => parseInput(input).reduce((best, line, row, grid) => line.reduce((b, c, col) => {
    if (row == 0) b = Math.max(b, solve(grid, row, col, 2))
    if (row == grid.length - 1) b = Math.max(b, solve(grid, row, col, 0))
    if (col == 0) b = Math.max(b, solve(grid, row, col, 1))
    if (col == line.length - 1) b = Math.max(b, solve(grid, row, col, 3))
    return b
}, best), 0)

module.exports = { part1, part2 }
