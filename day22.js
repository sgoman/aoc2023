'use strict'

const parseInput = input => input.split('\n').map(l => l.split(/[,~]/).map(Number))

const hash = (x, y, z) => [x, y, z].join(',')

const isSupported = (cubeSet, x, y, z) => {
    if (z == 0) return true
    return cubeSet.has(hash(x, y, z))
}

const drop = bricks => {
    let dropped = false
    const cubeSet = new Set()
    bricks = bricks.sort((a, b) => a[2] - b[2])
    for (const [sx, sy, sz, ex, ey, ez] of bricks) {
        for (let x = sx; x < ex + 1; x++) {
            for (let y = sy; y < ey + 1; y++) {
                for (let z = sz; z < ez + 1; z++) {
                    cubeSet.add(hash(x, y, z))
                }
            }
        }
    }
    // console.log({cubeSet})
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
            dropped = true
            b.push([sx, sy, sz - 1, ex, ey, ez - 1])
        }
    }
    return [b, dropped]
}

const solve = (isPart2, bricks) => {
    let result = 0, dropped = true, d = 0
    // console.log({bricks})
    while (dropped) {
        [bricks, dropped] = drop(bricks)
        d++
        // console.log({b: bricks.length, d, dropped, bricks})
    }
    for (let i = 0; i < bricks.length; i++) {
        result += drop(bricks.filter((f, j) => j != i))[1] ? 0 : 1
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
