'use strict'

const parseInput = input => input.split('\n').map(l => l.split(''))

const transpose = block => block.reduce((cols, row, r, arr) => {
    if (r == 0) for(let c = 0; c < row.length; c++) cols.push(arr.map(l => l[c]).reverse())
    return cols
}, [])

const tiltNorth = grid => grid.map(line => line.join('').split('#').map(s => s.split('').sort().join('')).join('#').split(''))

const load = input =>input.reduce((acc, line, row, arr) => acc + line.reduce((a, c, i) => a + (c == 'O' ? i + 1 : 0), 0), 0)

const key = input => input.map(l => l.join('')).join('')

const part1 = input => load(tiltNorth(transpose(parseInput(input))))

const part2 = input => {
    input = parseInput(input)
    const seen = {}, loop = 4e9
    for (let cycle = 0; cycle <= loop; cycle++) {
        input = tiltNorth(transpose(input))
        let l = 0
        switch(cycle % 4) {
            case 3: l = load(transpose(transpose(transpose(input)))); break
            case 2: l = load(transpose(transpose(input))); break
            case 1: l = load(transpose(input)); break
            case 0: l = load(input); break
        }
        const k = key(input)
        if (Object.hasOwn(seen, k)) {
            const s = seen[k][0]
            const m = (loop - cycle - 2) % (cycle - seen[k][0])
            const [[i, v]] = Object.values(seen).filter(f => f[0] == s + m)
            return v
        }
        seen[k] = [cycle, l]
    }
}

module.exports = { part1, part2 }
