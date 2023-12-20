'use strict'

const parseInput = input => input.split('\n').reduce((acc, line) => {
	let [name, targets] = line.split(' -> ')
	targets = targets.split(', ')
	const type = name[0]
	if (name != 'broadcaster') name = name.slice(1)
	acc[name] = [type, targets]
	return acc
}, {})

const gcd = (a, b) => a ? gcd(b % a, a) : b
const lcm = (a, b) => a * b / gcd(a, b)

const solve = (isPart2, nodes) => {
	let lows = 0, highs = 0
	const memo = {}
	const inputs = new Map()

	for (const node in nodes) {
		for (const target of nodes[node][1]) {
			if (!inputs.has(target)) {
				inputs.set(target, new Set())
			}
			const ins = inputs.get(target)
			ins.add(node)
			inputs.set(target, ins)
		}
	}
	for (const node in nodes) {
		const type = nodes[node][0]
		if (type == '%') memo[node] = false
		if (type == '&') {
			memo[node] = [...inputs.get(node).values()].reduce((acc, cur) => { acc[cur] = false; return acc }, {})
		}
	}

	const rxInput = [...inputs.get('rx').values()][0]
	const deciders = [...inputs.get(rxInput).values()]
	const deciderLows = new Map()
	const loops = isPart2 ? Infinity : 1000

	for (let i = 1; i <= loops; i++) {
		const queue = [[null, 'broadcaster', false]]
		while (queue.length) {
			const [source, node, pulse] = queue.shift()
			if (deciders.includes(node) && !pulse && !deciderLows.has(node)) {
				deciderLows.set(node, i)
				if (deciderLows.size == deciders.length && isPart2) return [...deciderLows.values()].reduce(lcm)
			}
			if (pulse) {
				highs++
			} else {
				lows++
			}
			if (!Object.keys(nodes).includes(node)) continue // for example input with non-existant nodes
			const [type, targets] = nodes[node]
			switch(type) {
				case 'b':
					for (const target of targets) queue.push([node, target, pulse])
					break
				case '%':
					if (!pulse) {
						memo[node] = !memo[node]
						for (const target of targets) queue.push([node, target, memo[node]])
					}
					break
				case '&':
					memo[node][source] = pulse
					const allHigh = Object.values(memo[node]).every(v => v)
					for (const target of targets) queue.push([node, target, !allHigh])
					break
			}
		}
	}
	return lows * highs
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
