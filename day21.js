'use strict'

const parseInput = input => {
    // expand the input 7 times in width and height
    const parsed = input.split('\n').map(l => (l+l+l+l+l+l+l).split(''))
    for (let i = 0; i < 131 * 6; i++) parsed.push(parsed[i])
    return parsed
}

const hash = (row, col) => `${row},${col}`
const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

const quadraticMystery = (n, [a, b, c]) => a + n * (b - a) + n * Math.floor((n - 1) / 2) * ((c - b) - (b - a))

const solve = (isPart2, grid) => {
    const counts = [], c = 131 * 3 + 65 // startposition in the center of the expanded map (one of the 49 "S" locations)
    let plots = new Map()
    plots.set(hash(c, c), [c, c])
    for (let s = 0; s < 330; s++) {
        if (!isPart2 && s == 64) return plots.size
        if ([65, 196, 327].includes(s)) counts.push(plots.size)
        const reached = new Map()
        for (const [row, col] of plots.values()) {
            for (const [dr, dc] of dirs) {
                const nr = row + dr, nc = col + dc
                if (grid[nr][nc] != '#') reached.set(hash(nr, nc), [nr, nc])
            }
        }
        plots = reached
    }

    return quadraticMystery(Math.floor(26501365 / 131), counts)
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
