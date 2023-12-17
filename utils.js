'use strict'

//////////////////// GRIDS
// directions are: 0 for up, 1 for right, 2 for down and 3 for left
export const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

// all 8 neighbours, but not the center piece
export const neightbors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

// checks whether a row and colum exist in a grid
export const validCoordForGrid = (row, col, grid) => row >= 0 && row < grid.length && col >= 0 && col < grid[row].length

// "rotates" a two dimenstional array 90° clockwise
export const transpose = grid => grid.reduce((cols, row, r, arr) => {
    if (r == 0) for(let c = 0; c < row.length; c++) cols.push(arr.map(l => l[c]))
    return cols
}, [])

// classic rough distance on grids
export const manhattan = (a, b) => Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])

//////////////////// MATH
// Thanks, SO 47047682
// lcm usage: [2, 3, 4].reduce(lcm)
export const gcd = (a, b) => a ? gcd(b % a, a) : b
export const lcm = (a, b) => a * b / gcd(a, b)

// builds all possible pairs of all entries of a list (without mirrors)
export const pairs = (arr) => arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat()

// a generator that yields numbers of a range (
// a range can be defined as range(maxValue), range(startValue, maxValue) or range(startValue, maxValue, stepSize)
// usage: for (let num of range(42, 70)) console.log(num)
export const range = function* () {
    let start = 0, stop = 0, step = 1
    if (arguments.length == 3) {
        start = arguments[0]
        stop = arguments[1]
        step = arguments[2]
    } else if (arguments.length == 2) {
        start = arguments[0]
        stop = arguments[1]
    } else if (arguments.length) {
        stop = arguments[1]
    }

    if (stop < start) {
        const tmp = start
        start = stop
        stop = tmp
    }

    if (step == 0) step = 1

    if (step < 0) {
        for (let i = stop; i > start; i += step) yield i
    } else {
        for (let i = start; i < stop; i += step) yield i
    }
}

// taken from https://www.sahinarslan.tech/posts/deep-dive-into-data-structures-using-javascript-heap-binary-heap
// Min-Heap example: new Heap((a, b) => a[0] - b[0])
// Max-Heap example: new Heap((a, b) => b[0] - a[0])
class Heap {
    constructor(comparator) {
        this.heap = []
        this.comparator = comparator || ((a, b) => a - b)
    }

    size() { return this.heap.length }

    isEmpty() { return this.size() == 0 }

    peek() { return this.heap[0] }

    insert(value) { this.heap.push(value); this.heapifyUp() }

    delete() {
        if (this.isEmpty()) return null
        const poppedValue = this.peek()
        const bottom = this.size() - 1
        if (bottom > 0) this.swap(0, bottom)
        this.heap.pop()
        this.heapifyDown()
        return poppedValue
    }

    parentIndex(i) { return Math.floor((i - 1) / 2) }

    parentValue(i) { return i < this.size() && this.parentIndex(i) >= 0 ? this.heap[this.parentIndex(i)] : undefined }

    leftChildIndex(i) { return 2 * i + 1 }

    leftChildValue(i) { return this.hasLeftChild(i) ? this.heap[this.leftChildIndex(i)] : undefined }

    hasLeftChild(i) { return this.leftChildIndex(i) < this.size() }

    rightChildIndex(i) { return 2 * i + 2 }

    rightChildValue(i) { return this.hasRightChild(i) ? this.heap[this.rightChildIndex(i)] : undefined }

    hasRightChild(i) { return this.rightChildIndex(i) < this.size() }

    swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]] }

    heapifyUp() {
        let nodeIndex = this.size() - 1
        while ( nodeIndex > 0 && this.comparator(this.parentValue(nodeIndex), this.heap[nodeIndex]) > 0) {
            this.swap(nodeIndex, this.parentIndex(nodeIndex))
            nodeIndex = this.parentIndex(nodeIndex)
        }
    }

    heapifyDown() {
        let currNodeIndex = 0
        while (this.hasLeftChild(currNodeIndex)) {
            let smallerChildIndex = this.leftChildIndex(currNodeIndex)
            if (
                this.hasRightChild(currNodeIndex) &&
                this.comparator(
                    this.rightChildValue(currNodeIndex),
                    this.leftChildValue(currNodeIndex)
                ) < 0
            ) {
                smallerChildIndex = this.rightChildIndex(currNodeIndex)
            }
            if ( this.comparator( this.heap[currNodeIndex], this.heap[smallerChildIndex]) <= 0) break
            this.swap(currNodeIndex, smallerChildIndex)
            currNodeIndex = smallerChildIndex
        }
    }
}

//////////////////// STRINGS
// a simple algo for similarity, only comparing every nth element of a and b
export const levenstein = (a, b) => a.reduce((acc, c, i) => acc + (1* (c != b[i])), 0)
