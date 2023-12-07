'use strict'

const translations = [ ["T", "B"], ["J", "C"], ["Q", "D"], ["K", "E"], ["A", "F"] ] // for easy sorting

const type = hand => {
	let freq = {}
	hand.split('').forEach(c => { freq[c] = (Object.keys(freq).includes(c)) ? freq[c] + 1 : 1 })
	if (Object.keys(freq).includes('1')) { // this block handles jokers of part 2
		const joker = freq['1']
		freq = Object.fromEntries(Object.entries(freq).filter(f => f[0] != '1'))
		if (Object.values(freq).length) {
			const best = Object.entries(freq).sort((a, b) => b[1] - a[1] || b[0].localeCompare(a[0]))[0][0]
			freq[best] = freq[best] + joker
		} else {
			freq['1'] = joker
		}
	}
	const score = Object.values(freq).sort((a, b) => b - a).join('') // sorted frequencies, descending order
    return ["0", "11111", "2111", "221", "311", "32", "41", "5"].indexOf(score)
}

const solve = input => input.split('\n')
    .map(l => { // parsing the input
	    let [hand, bid] = l.split(' ')
	    translations.forEach(([from, to]) => { hand = hand.replaceAll(from, to) })
	    return {hand, bid: Number(bid), type: type(hand)}
    })
    .sort((a, b) => a.type - b.type || a.hand.localeCompare(b.hand)) // rank the hands
    .reduce((acc, cur, i) => acc + (i + 1) * cur.bid, 0) // tally up

const part1 = input => solve(input)

const part2 = input => solve(input.replaceAll('J', '1')) // another easy sorting hack...

module.exports = { part1, part2 }
