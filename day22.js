'use strict'

const parseInput = input => input.split('\n').map(l => l.split(/[,~]/).map(Number)).sort((a, b) => a[2] - b[2])

const hash = (x, y, z) => [x, y, z].join(',')

const isSupported = (cubeSet, x, y, z) => (z == 0) ? true : cubeSet.has(hash(x, y, z))

const drop = bricks => {
    let dropped = 0
    const cubeSet = new Set()
    for (const [sx, sy, sz, ex, ey, ez] of bricks)
        for (let x = sx; x < ex + 1; x++)
            for (let y = sy; y < ey + 1; y++)
                for (let z = sz; z < ez + 1; z++)
                    cubeSet.add(hash(x, y, z))
    const b = []
    for (const [sx, sy, sz, ex, ey, ez] of bricks) {
        let supported = false
        for (let x = sx; x < ex + 1; x++) {
            for (let y = sy; y < ey +1; y++) {
                if (isSupported(cubeSet, x, y, sz - 1)) {
                    supported = true
                    break
                }
            }
            if (supported) break
        }
        if (supported) {
            b.push([sx, sy, sz, ex, ey, ez])
        } else {
            dropped++
            b.push([sx, sy, sz - 1, ex, ey, ez - 1])
            for (let x = sx; x < ex + 1; x++) {
                for (let y = sy; y < ey +1; y++) {
                    cubeSet.delete(hash(x, y, ez))
                    cubeSet.add(hash(x, y, sz - 1))
                }
            }
        }
    }
    return [b, dropped]
}

const solve = (isPart2, bricks) => {
    let result = 0, dropped = 1, d = 0
    while (dropped) [bricks, dropped] = drop(bricks)
    for (let i = 0; i < bricks.length; i++) {
        [d, dropped] = drop(bricks.filter((f, j) => j != i))
        result += isPart2 ? dropped : !dropped
    }
    return result
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
