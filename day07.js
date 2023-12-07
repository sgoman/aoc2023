'use strict'

const strength = {
	"2": 1,
	"3": 2,
	"4": 3,
	"5": 4,
	"6": 5,
	"7": 6,
	"8": 7,
	"9": 8,
	"B": 9,
	"C": 10,
	"D": 11,
	"E": 12,
	"F": 13
}

const translations = [
	{ "from": "T", "to": "B" },
	{ "from": "J", "to": "C" },
	{ "from": "Q", "to": "D" },
	{ "from": "K", "to": "E" },
	{ "from": "A", "to": "F" }
]

const kind = hand => {
	const k = {}
	hand.split('').forEach(c => {
		if (Object.keys(k).includes(c)) {
			k[c] = k[c] + 1
		} else {
			k[c] = 1
		}
	})
	const score = Object.values(k).sort((a, b) => b - a).join('')
	if (score == '5') {
		return 7
	} else if (score == "41") {
		return 6
	} else if (score == "32") {
		return 5
	} else if (score == "311") {
		return 4
	} else if (score == "221") {
		return 3
	} else if (score == "2111") {
		return 2
	} else if (score == "11111") {
		return 1
	} else {
		return 0
	}
}

const parseInput = input => {
    return input.split('\n').map(l => {
	    let [hand, bid] = l.split(' ')
	    translations.forEach(t => { while(hand.includes(t.from)) hand = hand.replace(t.from, t.to)} )
	    return {hand, bid: Number(bid), kind: kind(hand)}
    }).sort((a, b) => a.kind - b.kind || a.hand.localeCompare(b.hand))
}

const solve = (isPart2, input) => {
    return input.reduce((acc, cur, i) => acc + (i + 1) * cur.bid, 0)
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
