'use strict'

const substitutions = [
	{ letters: "1", digit: "1" },
	{ letters: "2", digit: "2" },
	{ letters: "3", digit: "3" },
	{ letters: "4", digit: "4" },
	{ letters: "5", digit: "5" },
	{ letters: "6", digit: "6" },
	{ letters: "7", digit: "7" },
	{ letters: "8", digit: "8" },
	{ letters: "9", digit: "9" },
	{ letters: "one", digit: "1" },
	{ letters: "two", digit: "2" },
	{ letters: "three", digit: "3" },
	{ letters: "four", digit: "4" },
	{ letters: "five", digit: "5" },
	{ letters: "six", digit: "6" },
	{ letters: "seven", digit: "7" },
	{ letters: "eight", digit: "8" },
	{ letters: "nine", digit: "9" }
]

const findFirst = (input, subs) => {
	let last = 1
	while (last <= input.length) {
		for (const n of subs) {
			if (input.substring(0, last).includes(n.letters)) return n.digit
		}
		last++
	}
}

const findLast = (input, subs) => {
	const l = input.length
	let first = l - 1
	while (first >= 0) {
		for (const n of subs) {
			if (input.substring(first, l).includes(n.letters)) return n.digit
		}
		first--
	}
}

const solve = (isPart2, input) => {
    const subs = isPart2 ? substitutions : substitutions.filter(f => f.letters.length == 1)
    return input
        .split('\n')
        .map(line => 1 * (findFirst(line, subs) + findLast(line, subs)))
        .reduce((acc, cur) => acc += cur, 0)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
