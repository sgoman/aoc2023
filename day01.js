'use strict'

const substitutions = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ]

const findFirst = (input, subs) => {
	let last = 0
	while (last++ <= input.length)
		for (const n of subs)
			if (input.substring(0, last).includes(n)) return (subs.indexOf(n) % 9) + 1
}

const findLast = (input, subs) => {
	const l = input.length
	let first = l
	while (first-- >= 0)
		for (const n of subs)
			if (input.substring(first, l).includes(n)) return (subs.indexOf(n) % 9) + 1
}

const solve = (isPart2, input) => {
    const subs = isPart2 ? substitutions : substitutions.filter(f => f.length == 1)
    return input
        .split('\n')
        .map(line => 10 * findFirst(line, subs) + findLast(line, subs))
        .reduce((acc, cur) => acc += cur, 0)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
