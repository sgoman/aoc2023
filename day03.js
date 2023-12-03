'use strict'

const findNums = (line, index) => {
    let start = Math.max(index - 1, 0)
    while(line.substring(start, start + 1).match(/\d/) && start--) {}
    let end = Math.min(index + 1, line.length - 1)
    while(line.substring(end, end + 1).match(/\d/) && end++ < line.length) {}
    const strip = line.substring(start, end).replaceAll(/\D/g, ' ').trim()
    return strip.length ? strip.split(' ') : []
}

const part1 = input => input.split('\n').reduce((result, line, row, lines) => {
    for (const match of line.matchAll(/(\d+)/g)) {
        let patch = line.substring(Math.max(0, match.index - 1), Math.min(line.length, match.index + match[0].length + 1))
        if (row) patch += lines[row - 1].substring(Math.max(0, match.index - 1), Math.min(line.length, match.index + match[0].length + 1))
        if (row < lines.length - 1) patch += lines[row + 1].substring(Math.max(0, match.index - 1), Math.min(line.length, match.index + match[0].length + 1))
        result += (patch.replaceAll(/[0-9\.]/g, '').length > 0) * match[0]
    }
    return result
}, 0)

const part2 = input => input.split('\n').reduce((result, line, row, lines) => {
    for (const match of line.matchAll(/([\*])/g)) {
        let connects = []
        if (row) for (const num of findNums(lines[row - 1], match.index)) connects.push(num)
        for (const num of findNums(line, match.index)) connects.push(num)
        if (row < lines.length - 1) for (const num of findNums(lines[row + 1], match.index)) connects.push(num)
        if (connects.length == 2) result += connects[0] * connects[1]
    }
    return result
}, 0)

module.exports = { part1, part2 }
