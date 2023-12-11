'use strict'

const parseInput = input => {
    let grid = input.split('\n').map(l => l.split(''))
    const emptyRows = grid.map((l, i) => [l, i]).filter(e => e[0].every(c => c == '.')).map(e => e[1])
    let emptyCols = []
    for (let c = 0; c < grid[0].length; c++) {
        if (grid.map(l => l[c]).every(e => e == '.')) emptyCols.push(c)
    }
    emptyRows.reverse().forEach(row => grid.splice(row, 0, grid[row]))
    // I'm ignoring the bug that adds extra empty space on empty lines from the next instruction...
    emptyCols.reverse().forEach(col => grid = grid.reduce((acc, row) => { row.splice(col, 0, '.'); acc.push(row); return acc}, []))
    const galaxies = []
    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[0].length; c++)
            if (grid[r][c] == '#') galaxies.push({id: galaxies.length, row: r, col: c})
    return galaxies
}

const pairs = (arr) => arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat()

const manhattan = (a, b) => Math.abs(b.row - a.row) + Math.abs(b.col - a.col)

const solve = (isPart2, input) => {
    return pairs(input).reduce((acc, [a, b]) => acc + manhattan(a, b), 0)
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
