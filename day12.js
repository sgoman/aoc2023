'use strict'

const parseInput = input => input.split('\n').map(l => {
    const [pattern, condition] = l.split(' ')
    return [pattern, condition.split(',').map(Number)]
})

const solve = (memo, pattern, condition, p, c, spring) => {
    const key = `${p}-${c}-${spring}`
    if (Object.hasOwn(memo, key)) return memo[key]
    if (p == pattern.length) return ((c == condition.length && spring == 0) || (c == condition.length - 1 && spring == condition[c]))
    let t = 0
    if ([".", "?"].includes(pattern[p])) {
        if (spring == 0) {
            t += solve(memo, pattern, condition, p + 1, c, 0)
        } else if (condition[c] == spring) {
            t += solve(memo, pattern, condition, p + 1, c + 1, 0)
        }
    }
    if (["#", "?"].includes(pattern[p])) {
        t += solve(memo, pattern, condition, p + 1, c, spring + 1)
    }
    memo[key] = t
    return t
}

const part1 = input => parseInput(input).reduce((acc, [pattern, condition]) => acc + solve({}, pattern, condition, 0, 0, 0), 0)

const part2 = input => parseInput(input)
        .map(([p, c]) => [[p, p, p, p, p].join('?'), [c, c, c, c, c].flat()])
        .reduce((acc, [pattern, condition]) => acc + solve({}, pattern, condition, 0, 0, 0), 0)

module.exports = { part1, part2 }
