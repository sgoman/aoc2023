'use strict'

//////////////////// GRIDS
// directions are: 0 for up, 1 for right, 2 for down and 3 for left
export const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]

// all 8 neighbours, but not the center piece
export const neighbours = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

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
// methods and attributes starting with an underscore are considered private and should not be called from the outside
// Min-Heap example: new Heap((a, b) => a[0] - b[0])
// Max-Heap example: new Heap((a, b) => b[0] - a[0])
class Heap {
    constructor(comparator) {
        this._heap = []
        this._comparator = comparator || ((a, b) => a - b)
    }

    size() { return this._heap.length }

    isEmpty() { return this.size() == 0 }

    peek() { return this._heap[0] }

    insert(value) { this._heap.push(value); this._heapifyUp() }

    extract() {
        if (this.isEmpty()) return null
        const poppedValue = this.peek()
        const bottom = this.size() - 1
        if (bottom > 0) this._swap(0, bottom)
        this._heap.pop()
        this._heapifyDown()
        return poppedValue
    }

    _parentIndex(i) { return Math.floor((i - 1) / 2) }

    _parentValue(i) { return i < this.size() && this._parentIndex(i) >= 0 ? this._heap[this._parentIndex(i)] : undefined }

    _leftChildIndex(i) { return 2 * i + 1 }

    _leftChildValue(i) { return this._hasLeftChild(i) ? this._heap[this._leftChildIndex(i)] : undefined }

    _hasLeftChild(i) { return this._leftChildIndex(i) < this.size() }

    _rightChildIndex(i) { return 2 * i + 2 }

    _rightChildValue(i) { return this._hasRightChild(i) ? this._heap[this._rightChildIndex(i)] : undefined }

    _hasRightChild(i) { return this._rightChildIndex(i) < this.size() }

    _swap(i, j) { [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]] }

    _heapifyUp() {
        let nodeIndex = this.size() - 1
        while ( nodeIndex > 0 && this._comparator(this._parentValue(nodeIndex), this._heap[nodeIndex]) > 0) {
            this._swap(nodeIndex, this._parentIndex(nodeIndex))
            nodeIndex = this._parentIndex(nodeIndex)
        }
    }

    _heapifyDown() {
        let currNodeIndex = 0
        while (this._hasLeftChild(currNodeIndex)) {
            let smallerChildIndex = this._leftChildIndex(currNodeIndex)
            if (
                this._hasRightChild(currNodeIndex) &&
                this._comparator(
                    this._rightChildValue(currNodeIndex),
                    this._leftChildValue(currNodeIndex)
                ) < 0
            ) {
                smallerChildIndex = this._rightChildIndex(currNodeIndex)
            }
            if ( this._comparator( this._heap[currNodeIndex], this._heap[smallerChildIndex]) <= 0) break
            this._swap(currNodeIndex, smallerChildIndex)
            currNodeIndex = smallerChildIndex
        }
    }
}

//////////////////// STRINGS
// a simple algo for similarity, only comparing every nth element of a and b
export const levenstein = (a, b) => a.reduce((acc, c, i) => acc + (1* (c != b[i])), 0)

// returns a printable string where all columns of a row are glued together and the rows are joined by new line characters
export const gridToString = grid => grid.map(l => l.join('')).join('\n')
