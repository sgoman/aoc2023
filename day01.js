'use strict'

const parseInput = input => {
    const result = []
    for (const line of input.split('\n')) {
        const nums = line.replace(/\D/g, '')
        result.push(1* (nums[0] + nums[nums.length - 1]))
    }
    return result
}

const solve = (isPart2, input) => {

    return input.reduce((acc, cur) => acc += cur, 0)
}

const part1 = input => {
  return solve(false, parseInput(input))
}

const part2 = input => {
    const result = []
    for (const line of input.split('\n')) {
        let nums = line.replace(/one/g, '1')
            nums = nums.replace(/two/g, '2')
            nums = nums.replace(/three/g, '3')
            nums = nums.replace(/four/g, '4')
            nums = nums.replace(/five/g, '5')
            nums = nums.replace(/six/g, '6')
            nums = nums.replace(/seven/g, '7')
            nums = nums.replace(/eight/g, '8')
            nums = nums.replace(/nine/g, '9')
            nums = nums.replace(/\D/g, '')
        result.push(1* (nums[0] + nums[nums.length - 1]))
    }
  return result.reduce((acc, cur) => acc += cur, 0)
}

module.exports = { part1, part2 }
