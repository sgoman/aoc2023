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

const score = ranges => {
    let result = 1
    for (const r of Object.values(ranges)) result *= r[1] - r[0] + 1
    return result
}

const cloneRanges = ranges => {
    const result = {}
    for (const k of "xmas".split('')) result[k] = [ranges[k][0], ranges[k][1]]
    return result
}

const applyRulesToRanges = (rules, rule, ranges) => {
    // console.log({rule, ranges, conditions: rules[rule]})
    let result = 0
    for (const condition of rules[rule]) {
        if (condition.includes('?')) {
            const k = condition[0]
            const o = condition[1]
            const v = Number(condition.match(/(\d+)/)[1])
            const n = condition.split(':')[0].split('?')[1].trim().split('').slice(1, -1).join('')
            const nr = cloneRanges(ranges)
            // console.log({rule, condition, k, o, v, n, result})
            if (o == '>') {
                if (nr[k][1] > v) {
                    nr[k][0] = Math.max(nr[k][0], v + 1)
                    if (n == 'A') {
                        result += score(nr)
                        // console.log({rule, condition, result, msg: 'accepted', nr})
                    } else if (n != 'R') {
                        // console.log({rule, condition, result, msg: 'dive deeper into ' + n})
                        result += applyRulesToRanges(rules, n, nr)
                    }
                    ranges[k][1] = Math.min(ranges[k][1], v)
                }
            } else {
                if (nr[k][0] < v) {
                    nr[k][1] = Math.min(nr[k][1], v - 1)
                    if (n == 'A') {
                        result += score(nr)
                        // console.log({rule, condition, result, msg: 'accepted', nr})
                    } else if (n != 'R') {
                        // console.log({rule, condition, result, msg: 'dive deeper into ' + n})
                        result += applyRulesToRanges(rules, n, nr)
                    }
                    ranges[k][0] = Math.max(nr[k][0], v)
                }
            }
        } else {
            const cond = eval(condition)
            if (cond == 'A') {
                result += score(ranges)
                // console.log({rule, cond, result, msg: 'accepted', ranges})
            } else if (cond != 'R') {
                // console.log({rule, cond, result, msg: 'unconditionally dive deeper'})
                result += applyRulesToRanges(rules, cond, ranges)
            }
        }
    }
    return result
}

const part1 = input => {
    const [rules, parts] = parseInput(input)
    return parts.reduce((acc, part) => acc + applyRules(rules, 'in', part), 0)
}

const part2 = input => {
    const [rules] = parseInput(input)
    return applyRulesToRanges(rules, 'in', {x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000]})
}

module.exports = { part1, part2 }
