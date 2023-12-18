'use strict'

const parseInput = input => input.split('\n').map(l => l.split(' ')).map(([command, dist, color]) => ["URDL".indexOf(command), Number(dist), color.replace('(', '').replace(')', '')])

const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

const walk = parsed => {
	const tiles = []
	let row = 0, col = 0
	for (const [command, dist, color] of parsed) {
		for (const _ of Array(dist)) {
			row += dirs[command][0]
			col += dirs[command][1]
			tiles.push([row, col])
		}
	}
	return tiles
}

const solve = (isPart2, input) => {
	const walked = walk(input)
	const minRow = Math.min(...walked.map(e => e[0]))
	const maxRow = Math.max(...walked.map(e => e[0]))
	const minCol = Math.min(...walked.map(e => e[1]))
	const maxCol = Math.max(...walked.map(e => e[1]))
	const rowOffset = 0 - minRow, colOffset = 0 - minCol
	const grid = walked.reduce((acc, [row, col]) => {
		acc[row + rowOffset][col + colOffset] = '#'
		return acc
	}, Array(maxRow - minRow + 1).fill(0).map(_ => Array(maxCol - minCol + 1).fill(0).map(() => '.')))
	const colStart = grid[1].join('').indexOf('#.') + 1
	// console.log({minRow, maxRow, minCol, maxCol, rowOffset, colOffset, colStart})
	const visited = new Set()
	const bfs = [[1, colStart]]
	while (bfs.length) {
		const [row, col] = bfs.shift()
		grid[row][col] = '#'
		for (const [dr, dc] of dirs) {
			const nr = row + dr, nc = col + dc
			const k = '' + nr + ';' + nc
			if (grid[nr][nc] == '.' && !visited.has(k)) {
				bfs.push([nr, nc])
				visited.add(k)
			}
		}
	}
	// console.log(grid.slice(0, 16).map(l => l.slice(0, 170).join('')).join('\n'))
	// console.log(grid.map(l => l.join('')).join('\n'))
    return grid.reduce((acc, line) => acc + line.filter(t => t == '#').length, 0)
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
