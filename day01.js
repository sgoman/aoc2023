'use strict'

const subs = [
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

const parseInput = input => {
    const result = []
    for (const line of input.split('\n')) {
        const nums = line.replace(/\D/g, '')
        result.push(1* (nums[0] + nums[nums.length - 1]))
    }
    return result
}

const solve = (isPart2, input) => {

    return input.reduce((acc, cur) => acc += cur, 0)
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const findFirst = input => {
	let last = 1
	while (last <= input.length) {
		for (const n of subs) {
			if (input.substring(0, last).includes(n.letters)) return n.digit
		}
		last++
	}
}

const findLast = input => {
	const l = input.length
	let first = l - 1
	while (first >= 0) {
		for (const n of subs) {
			if (input.substring(first, l).includes(n.letters)) return n.digit
		}
		first--
	}
}

const part2 = input => {
	const result = []
	for (const line of input.split('\n')) {
		const first = findFirst(line)
		const last = findLast(line)
		result.push(1* (first + last))
	}
	return solve(true, result)
}

module.exports = { part1, part2 }
