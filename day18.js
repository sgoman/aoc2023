'use strict'

const parseInput = input => input.split('\n').map(l => l.split(' '))
	.map(([command, dist, color]) => [
		"URDL".indexOf(command),
		Number(dist),
		(Number(color[7]) + 1) % 4,
		parseInt(color.slice(2,-2), 16)
	])

const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

const solve = parsed => {
	const [area, boundary] = parsed.reduce(([a, d, row, col, prevR, prevC], [command, dist]) => {
		const [dr, dc] = dirs[command]
		prevR = row
		prevC = col
		row += dr * dist
		col += dc * dist
		a += prevC * row - col * prevR
		d += dist
		return [a, d, row, col, prevR, prevC]
	}, [0, 0, 0, 0, 0, 0])
	return Math.abs(area / 2) + boundary / 2 + 1
}

const part1 = input => solve(parseInput(input))

const part2 = input => solve(parseInput(input).map(l => l.slice(2)))

module.exports = { part1, part2 }
