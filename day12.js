'use strict'

const parseInput = input => input.split('\n').map(l => {
    const [pattern, condition] = l.split(' ')
    return [pattern.replaceAll('.', ' ').replaceAll('?', '.'), condition.split(',').map(Number)]
})

const isValid = (pattern, condition) => {
    // if (pattern.split('').filter(f => f != ' ' && f != '#').length) return false
    const parts = pattern.trim().split(/\s+/g)
    if (parts.length != condition.length) return false
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length != condition[i]) return false
    }
    return true
}

const solve = (isPart2, input) => {
    let result = 0
    for (const [pattern, condition] of input) {
        if (isValid(pattern, condition)) {
            result++
        } else {
            const spots = pattern.split('').filter(f => f == '.').length
            const iterations = Math.pow(2, spots)
            for (let mutation = 0; mutation < iterations; mutation++) {
                const bin = (mutation >>> 0).toString(2).padStart(spots, '0').replaceAll('0', ' ').replaceAll('1', '#')
                let patt = pattern.split('')
                let found = 0
                for (let p = 0; p < pattern.length; p++) {
                    if (patt[p] == '.') patt[p] = bin[found++]
                }
                const mut = patt.join('')
                if (isValid(mut, condition)) result++
            }
        }
    }
    return result
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
