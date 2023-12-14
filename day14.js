'use strict'

const parseInput = input => input.split('\n').map(l => l.split(''))

const transpose = block => block.reduce((cols, row, r, arr) => {
    if (r == 0) for(let c = 0; c < row.length; c++) cols.push(arr.map(l => l[c]).reverse())
    return cols
}, [])

const tiltNorth = grid => {
    for (let r = grid.length - 1, h = grid.length; r > 0; r--) {
        for (let c = 0, w = grid[0].length; c < w; c++) {
            let a = r - 1
            while (a >= 0 && grid[a][c] != '#') a--
            a = Math.max(0, a)
            while (a < r && grid[a][c] != '.') a++
            a = Math.min(a, r - 1)
            if (grid[r][c] == 'O' && grid[a][c] == '.') {
                grid[r][c] = '.'
                grid[a][c] = 'O'
            }
        }
    }
    return grid
}

const load = input =>input.reduce((acc, line, row, arr) => acc + (line.filter(f => f == 'O').length * (arr.length - row)), 0)

const part1 = input => load(tiltNorth(parseInput(input)))

const part2 = input => {
    input = parseInput(input)
    let cycle = 0, prev = -1, l = 0
    while (cycle <= 4e9) {
        input = tiltNorth(input)
        l = load(input)
        if (cycle % 4 == 0) {
        }
        input = transpose(input)
        if (cycle % 4 == 3) {
            if (l == prev) return l
            prev = l
            // for(const line of input) console.log(line.join(''))
            // console.log()
        }
        cycle++
    }
    return l
}

module.exports = { part1, part2 }
