'use strict'

// directions are: 0 for up, 1 for right, 2 for down and 3 for left
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

const pipes = {
    "|": "02",
    "-": "13",
    "L": "01",
    "J": "03",
    "7": "23",
    "F": "12",
    ".": "",
}

const parseInput = input => input.split('\n').map(l => l.split(''))

const findStart = grid => grid.reduce((acc, cur, row) => {
    if (grid[row].includes('S')) { acc.push(row); acc.push(grid[row].findIndex(e => e == 'S')) }
    return acc
}, [])

const findConnections = (grid, row, col) => {
    return dirs.reduce((acc, [drow, dcol], dir) => {
        const nrow = row + drow, ncol = col + dcol
        if (nrow >= 0 && nrow < grid.length && ncol >= 0 && ncol < grid[0].length) {
            const pipe = pipes[grid[nrow][ncol]], entrance = (dir + 2) % 4
            if (pipe.includes(entrance)) acc.push([nrow, ncol, 1 * pipe.replace(entrance, '')])
        }
        return acc
    }, [])
}

const solve = (isPart2, grid) => {
    const [srow, scol] = findStart(grid)
    const visited = new Set('' + srow + '-' + scol)
    let connections = findConnections(grid, srow, scol)
    while(connections.length) {
        const [row, col, dir] = connections.shift()
        const key = '' + row + '-' + col
        if (!visited.has(key)) {
            visited.add(key)
            const nrow = row + dirs[dir][0], ncol = col + dirs[dir][1]
            connections.push([nrow, ncol, 1 * pipes[grid[nrow][ncol]].replace((dir + 2) % 4, '')])
        }
    }
    return visited.size / 2 - 1
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
