'use strict'

const hashmap = label => label.split('').reduce((acc, c) => (((acc + c.charCodeAt(0)) * 17) % 256), 0)
const parseInput = input => input.trim().split(',').map(l => [hashmap(l), l.match(/^(?<label>[a-z]+)(?<operator>[-=])(?<lens>\d)?$/).groups ])

const part1 = input => parseInput(input).reduce((acc, [cur]) => acc + cur, 0)

const part2 = input => {
    input = parseInput(input).map(e => ({label: e[1].label, hash: hashmap(e[1].label), operator: e[1].operator, lens: Number(e[1].lens)}))
    const boxes = Array(256).fill(0).map(b => [])
    input.forEach(({label, hash, operator, lens}) => {
        const i = boxes[hash].reduce((acc, [n, l], i) => (n == label) ? i : acc, -1)
        if (operator == '-' && i > -1) {
            boxes[hash].splice(i, 1)
	} else if (operator == '=') {
            if (i > -1) {
                boxes[hash].splice(i, 1, [label, lens])
            } else {
                boxes[hash].push([label, lens])
            }
        }
    })
    return boxes.reduce((acc, box, b) => acc + box.reduce((a, [n, l], i) => a + ((b + 1) * (i + 1) * l), 0), 0)
}

module.exports = { part1, part2 }
