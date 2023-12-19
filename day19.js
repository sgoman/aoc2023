'use strict'

const parseInput = input => {
    let [rules, parts] = input.split('\n\n').map(b => b.split('\n'))
    parts = parts.map(l => l.match(/(\d+)/g).map(Number))
    rules = rules.map(l => l.replace('}', '').split('{')).reduce((acc, [name, conditions]) => {
        const cnds = conditions.split(',').map(cnd => {
            if (cnd.includes(':')) {
                const [c, r] = cnd.split(':')
                return `${c} ? '${r}' : 'DidNotMatch'`
            }
            return `'${cnd}'`
        })
        acc[name] = cnds
        return acc
    }, {})
    return [rules, parts]
}

const applyRules = (rules, rule, [x, m, a, s]) => {
    for (const condition of rules[rule]) {
        const result = eval(condition)
        if (result == 'R') {
            return 0
        } else if (result == 'A') {
            return x + m + a + s
        } else if (result != 'DidNotMatch') {
            return applyRules(rules, result, [x, m, a, s])
        }
    }
    return 0 // should never be reached
}

const solve = (isPart2, [rules, parts]) => parts.reduce((acc, part) => acc + applyRules(rules, 'in', part), 0)

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
