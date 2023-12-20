'use strict'

class Broadcast {
	constructor(name, targets) {
		this._id = name
		this._targets = targets
		this._lowPulses = 0
		this._highPulses = 0
	}

	type() { return 'Broadcast' }

	targets() { return this._targets }

	execute(pulse) {
		this._lowPulses++
		return this._targets.reduce((acc, cur) => [this._id, cur, pulse], [])
	}
}

class Flipflop {
	constructor(name, targets) {
		this._id = name
		this._targets = targets
		this._state = false
		this._lowPulses = 0
		this._highPulses = 0
	}

	type() { return 'Flipflop' }

	targets() { return this._targets }

	execute(pulse) {
		if (!pulse) {
			this._state = !this._state
			if (this._state) {
				this._highPulses += this._targets.length
			} else {
				this._lowPulses += this._targets.length
			}
			return this._targets.reduce((acc, cur) => [this._id, cur, this._state], [])
		}
	}
}

class Conjunction {
	constructor(name, targets) {
		this._id = name
		this._targets = targets
		this._state = {}
		this._watched = []
		this._lowPulses = 0
		this._highPulses = 0
	}

	type() { return 'Conjunction' }

	targets() { return this._targets }

	init(source) {
		this._state[source] = false
		this._watched.add(source)
	}

	execute(pulse, source) {
		this._state[source] = pulse
		const allHigh = Object.values(this._state).every(v => v)
		if (!allHigh) {
			this._highPulses += this._targets.length
		} else {
			this._lowPulses += this._targets.length
		}
		return this._targets.reduce((acc, cur) => [this._id, cur, !allHigh], [])
	}
}

const parseInputClasses = input => {
    const parsed = input.split('\n').map(l => {
	    let [left, right] = l.split(' -> ')
	    let type
	    const targets = right.split(', ')
	    switch(left[0]) {
		    case '%':
			    left = left.slice(1)
			    type = new Flipflop(left, targets)
			    break
		    case '&':
			    left = left.slice(1)
			    type = new Conjunction(left, targets)
			    break
		    default:
			    type = new Broadcast(targets)
			    break
	    }
	    return [left, type]
    })
	.reduce((acc, [name, type]) => { acc[name] = type; return acc }, {})

	for (const name in parsed) {
		for (const target of parsed[name].targets()) {
			if (parsed[target].type() == 'Conjunction') parsed[target].init(name)
		}
	}

	return parsed
}

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

const solve1 = nodes => {
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

	for (let i = 0; i < 1000; i++) {
		let queue = [[null, 'broadcaster', false]]
		while (queue.length) {
			const upcoming = []
			for (const [source, node, pulse] of queue) {
				if (pulse) {
					highs++
				} else {
					lows++
				}
				if (!Object.keys(nodes).includes(node)) continue // for example input with non-existant nodes
				const [type, targets] = nodes[node]
				switch(type) {
					case 'b':
						for (const target of targets) upcoming.push([node, target, pulse])
						break
					case '%':
						if (!pulse) {
							memo[node] = !memo[node]
							for (const target of targets) upcoming.push([node, target, memo[node]])
						}
						break
					case '&':
						memo[node][source] = pulse
						const allHigh = Object.values(memo[node]).every(v => v)
						for (const target of targets) upcoming.push([node, target, !allHigh])
						break
				}
			}
			queue = upcoming
		}
	}
    return lows * highs
}

const solve2 = nodes => {
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
	let tick = 0

	while (deciderLows.size < deciders.length) {
		tick++
		let queue = [[null, 'broadcaster', false]]
		while (queue.length) {
			const upcoming = []
			for (const [source, node, pulse] of queue) {
				if (deciders.includes(node) && !pulse && !deciderLows.has(node)) deciderLows.set(node, tick)
				if (pulse) {
					highs++
				} else {
					lows++
				}
				if (!Object.keys(nodes).includes(node)) continue // for example input with non-existant nodes
				const [type, targets] = nodes[node]
				switch(type) {
					case 'b':
						for (const target of targets) upcoming.push([node, target, pulse])
						break
					case '%':
						if (!pulse) {
							memo[node] = !memo[node]
							for (const target of targets) upcoming.push([node, target, memo[node]])
						}
						break
					case '&':
						memo[node][source] = pulse
						const allHigh = Object.values(memo[node]).every(v => v)
						for (const target of targets) upcoming.push([node, target, !allHigh])
						break
				}
			}
			queue = upcoming
		}
	}
    return [...deciderLows.values()].reduce(lcm)
}

const part1 = input => solve1(parseInput(input))

const part2 = input => solve2(parseInput(input))

module.exports = { part1, part2 }
