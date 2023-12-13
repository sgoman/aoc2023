'use strict'

const parseInput = input => input.split('\n\n').map(b => b.split('\n').map(l => l.split('')))

const columns = block => block.reduce((cols, row, r, arr) => {
    if (r == 0) {
        for(let c = 0; c < row.length; c++) {
            cols.push(arr.map(l => l[c]))
        }
    }
    return cols
}, [])

const mirrors = block => {
    for(let row = 0; row < block.length - 1; row++) {
        if (block[row].join('') == block[row + 1].join('')) {
            let mirrored = true
            for(let r = row - 1; r >= 0 && row + (row - r) + 1 < block.length; r--) {
                if (block[r].join('') != block[row + (row - r) + 1].join('')) mirrored = false
            }
            if (mirrored) return row + 1
        }
    }
    return 0
}

const solve = (isPart2, input) => {
    return input.reduce((acc, block) => {
        const rowval = (100 * mirrors(block))
        const colval = mirrors(columns(block))
        if (rowval + colval == 0) {
            for(const line of block) console.log(line.join(''))
            console.log()
        }
        return acc + rowval + colval
    }, 0)
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
