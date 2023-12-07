'use strict'

const translations = [
	{ "from": "T", "to": "B" },
	{ "from": "J", "to": "C" },
	{ "from": "Q", "to": "D" },
	{ "from": "K", "to": "E" },
	{ "from": "A", "to": "F" }
]

const kind = hand => {
	let k = {}
	hand.split('').forEach(c => {
		if (Object.keys(k).includes(c)) {
			k[c] = k[c] + 1
		} else {
			k[c] = 1
		}
	})
	if (Object.keys(k).includes('1')) {
		const joker = k
		k = Object.fromEntries(Object.entries(k).filter(f => f[0] != '1'))
		if (Object.values(k).length) {
			const best = Object.entries(k).sort((a, b) => b[1] - a[1] || b[0].localeCompare(a[0]))[0][0]
			console.log({hand, joker, best, k})
			k[best] = k[best] + joker[1]
		} else {
			k[joker[0]] = joker[1]
		}
	}
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
	while(input.includes('J')) input = input.replace('J', '1')
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
