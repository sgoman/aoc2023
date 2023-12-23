'use strict'

const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

const canSteps = [".^", ".>", ".v", ".<"]

const hash = (row, col) => [row, col].join(',')

const parseInput = input => input.split('\n').map(l => l.split(''))

const solve = (isPart2, grid) => {
    const routes = [], bfs = []
    bfs.push([0, 1, 0, [hash(0, 1)]])
    while(bfs.length) {
        const [row, col, steps, seen] = bfs.shift()
        for (let i = 0; i < 4; i++) {
            const [dr, dc] = dirs[i]
            const nr = row + dr, nc = col + dc
            if (nr == grid.length - 1 && grid[nr][nc] == '.') {
                routes.push(steps + 1)
            } else if(nr >= 0 && nc >= 0 && canSteps[i].includes(grid[nr][nc]) && !seen.includes(hash(nr, nc))) {
                bfs.push([nr, nc, steps + 1, seen.concat([hash(nr, nc)])])
            }
        }
    }
    console.log({routes})
    return routes.reduce((acc, cur) => Math.max(acc, cur), 0)
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
