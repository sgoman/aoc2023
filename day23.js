'use strict'

const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

const canSteps = [".^", ".>", ".v", ".<"]

const hash = (row, col) => [row, col].join(',')

const parseInput = input => input.split('\n').map(l => l.split(''))

const solveFlood = grid => {
    const routes = [], bfs = []
    bfs.push([0, 1, 0, [hash(0, 1)]])
    while(bfs.length) {
        const [row, col, steps, seen] = bfs.pop()
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

const solveGraph = grid => {
    const nodes = [hash(0, 1), hash(grid.length - 1, grid[grid.length - 1].indexOf('.'))]
    const nodeDist = []
    const isValid = (row, col) => row >= 0 && row < grid.length && col > 0 && col < grid[0].length && grid[row][col] != '#'
    for (let i = 0; i < nodes.length; i++) {
        nodeDist[i] = {}
        const [row, col] = nodes[i].split(',').map(Number)
        const walk = (r, c, step, lastDir) => {
            if (!isValid(r, c)) return
            const valids = dirs.reduce((acc, [dr, dc], d) => acc + (isValid(r + dr, c + dc) ? 1 : 0), 0)
            if (step > 0 && (valids > 2 || r < 1 || r >= grid.length - 1)) {
                if (!nodes.includes(hash(r, c))) nodes.push(hash(r, c))
                nodeDist[i][nodes.indexOf(hash(r, c))] = step
                return
            }
            for (let s = 0; s < 4; s++) if ((s + 2) % 4 != lastDir) walk(r + dirs[s][0], c + dirs[s][1], step + 1, s)
        }
        walk(row, col, 0, -1)
    }

    let maxDist = 0
    const walk = (dist, node, prev) => {
        if (node == 1) {
            maxDist = Math.max(maxDist, dist)
            return
        }
        prev.push(node)
        for (let next in nodeDist[node]) {
            next = Number(next)
            if (prev.includes(next)) continue
            walk(dist + nodeDist[node][next], next, [...prev])
        }
    }
    walk(0, 0, [])
    return maxDist
}

const part1 = input => solveFlood(parseInput(input))

const part2 = input => solveGraph(parseInput(input))

module.exports = { part1, part2 }
