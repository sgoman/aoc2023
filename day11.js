'use strict'

const parseInput = (input, expansion) => {
    const grid = input.split('\n').map(l => l.split(''))
    const emptyRows = grid.map((l, i) => [l, i]).filter(e => e[0].every(c => c == '.')).map(e => e[1])
    const emptyCols = []
    for (let c = 0; c < grid[0].length; c++) {
        if (grid.map(l => l[c]).every(e => e == '.')) emptyCols.push(c)
    }
    const galaxies = []
    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[0].length; c++)
            if (grid[r][c] == '#') {
                const expandedRows = emptyRows.filter(f => f < r).length
                const expandedCols = emptyCols.filter(f => f < c).length
                galaxies.push({
                    id: galaxies.length,
                    row: expandedRows * expansion - expandedRows + r,
                    col: expandedCols * expansion - expandedCols + c
                })
            }
    return galaxies
}

const pairs = (arr) => arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat()

const manhattan = (a, b) => Math.abs(b.row - a.row) + Math.abs(b.col - a.col)

const solve = input => pairs(input).reduce((acc, [a, b]) => acc + manhattan(a, b), 0)

const part1 = input => solve(parseInput(input, 2))

const part2 = input => solve(parseInput(input, 1e6))

module.exports = { part1, part2 }
