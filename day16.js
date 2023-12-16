'use strict'

const space = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const slash = [[0, 1, 1], [-1, 0, 0], [0, -1, 3], [1, 0, 2]]
const back = [[0, -1, 3], [1, 0, 2], [0, 1, 1], [-1, 0, 0]]
const minus = [[[0, -1, 3], [0, 1, 1]], [[0, 1, 1]], [[0, -1, 3], [0, 1, 1]], [[0, -1, 3]]]
const pipe = [[[-1, 0, 0]], [[-1, 0, 0], [1, 0, 2]], [[1, 0, 2]], [[-1, 0, 0], [1, 0, 2]]]

const parseInput = input => input.split('\n').map(l => l.split(''))

const solve = (grid, sr, sc, sd) => {
    const h = grid.length, w = grid[0].length
    const onGrid = (r, c) => r >= 0 && r < h && c >= 0 && c < w
    const visited = [], repeated = []
    const beams = [[sr, sc, sd]] // a beam has row, column and direction
    while(beams.length) {
        const [row, col, dir] = beams.shift()
        const pos = '' + row + '-' + col
        const state = pos + dir
        if (repeated.includes(state)) {
            continue
        } else {
            repeated.push(state)
        }
        if (!visited.includes(pos)) visited.push(pos)
        let r, c, d
        switch(grid[row][col]) {
            case '.':
                r = row + space[dir][0]
                c = col + space[dir][1]
                if (onGrid(r, c)) beams.push([r, c, dir])
                break
            case '/':
                r = row + slash[dir][0]
                c = col + slash[dir][1]
                d = slash[dir][2]
                if (onGrid(r, c)) beams.push([r, c, d])
                break
            case '\\':
                r = row + back[dir][0]
                c = col + back[dir][1]
                d = back[dir][2]
                if (onGrid(r, c)) beams.push([r, c, d])
                break
            case '-':
                for (const [nr, nc, nd] of minus[dir]) {
                    r = row + nr
                    c = col + nc
                    if (onGrid(r, c)) beams.push([r, c, nd])
                }
                break
            case '|':
                for (const [nr, nc, nd] of pipe[dir]) {
                    r = row + nr
                    c = col + nc
                    if (onGrid(r, c)) beams.push([r, c, nd])
                }
                break
        }
    }
    return visited.length
}

const part1 = input => solve(parseInput(input), 0, 0, 1)

const part2 = input => {
    const grid = parseInput(input)
    const h = grid.length, w = grid[0].length
    let best = 0
    for (const [dir, row] of [[2, 0], [0, h - 1]]) {
        for (let col = 0; col < w; col++) {
            best = Math.max(best, solve(grid, row, col, dir))
        }
    }
    for (const [dir, col] of [[1, 0], [3, w - 1]]) {
        for (let row = 0; row < h; row++) {
            best = Math.max(best, solve(grid, row, col, dir))
        }
    }
    return best
}

module.exports = { part1, part2 }
