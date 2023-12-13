'use strict'

const parseInput = input => input.split('\n\n').map(b => b.split('\n').map(l => l.split('')))

const levenstein = (a, b) => a.reduce((acc, c, i) => acc + (1* (c != b[i])), 0)

const columns = block => block.reduce((cols, row, r, arr) => {
    if (r == 0) {
        for(let c = 0; c < row.length; c++) {
            cols.push(arr.map(l => l[c]))
        }
    }
    return cols
}, [])

const mirrors = (block, isPart2) => {
    for(let row = 0; row < block.length - 1; row++) {
        const same = block[row].join('') == block[row + 1].join('')
        let changed = !isPart2
        let lev = true
        if (isPart2 && !same) {
            const l = levenstein(block[row], block[row + 1])
            if (l == 1) {
                changed = true
            } else {
                lev = false
            }
        }
        if (isPart2 ? !same && lev || same : same) {
            let mirrored = true
            for(let r = row - 1; r >= 0 && row + (row - r) + 1 < block.length; r--) {
                if (block[r].join('') != block[row + (row - r) + 1].join('')) {
                    if (changed) {
                        mirrored = false
                    } else {
                        changed = true
                        if (levenstein(block[r], block[row + (row - r) + 1]) != 1) mirrored = false
                    }
                }
            }
            if (mirrored && changed) return row + 1
        }
    }
    return 0
}

const solve = (isPart2, input) => {
    return input.reduce((acc, block) => {
        const rowval = (100 * mirrors(block, isPart2))
        const colval = (isPart2 && rowval == 0 || !isPart2) ? mirrors(columns(block), isPart2) : 0
        return acc + rowval + colval
    }, 0)
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
