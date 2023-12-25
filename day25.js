'use strict'

const parseInput = input => input.split('\n').map(l => {
    const [key, links] = l.split(': ')
    return [key, links.split(' ')]
})
.reduce(([edges, vertids], [key, links]) => {
    if (!vertids.has(key)) vertids.set(key, vertids.size)
    for (const link of links) {
        if (!vertids.has(link)) vertids.set(link, vertids.size)
        edges.push([vertids.get(key), vertids.get(link)])
    }
    return [edges, vertids]
}, [[], new Map()])

const findGroups = (verts, edges, wanted) => {
    for (let i = 0; i < edges.length; ++i) {
        const j = Math.floor(Math.random() * i + 1)
        const t = edges[i]
        edges[i] = edges[j]
        edges[j] = t
    }

    let groupParents = [-1]
    let groupPromotions = [-1]
    let vertexGroups = new Uint16Array(verts)

    const union = (v1, v2) => {
        if (!vertexGroups[v1] && !vertexGroups[v2]) {
            const g = groupParents.length
            groupParents.push(g)
            groupPromotions.push(1)
            vertexGroups[v1] = g
            vertexGroups[v2] = g
        } else if (!vertexGroups[v1]) {
            const g = (vertexGroups[v2]=parent(v2))
            ++groupPromotions[g]
            vertexGroups[v1] = g
        } else if (!vertexGroups[v2]) {
            const g = (vertexGroups[v1]=parent(v1))
            ++groupPromotions[g]
            vertexGroups[v2] = g
        } else {
            let g1 = parent(v1)
            let g2 = parent(v2)

            if (g1 !== g2) {
                if (groupPromotions[g1] > groupPromotions[g2]) [g2, g1] = [g1, g2]
                groupPromotions[g2] += groupPromotions[g1] + 1
                groupParents[g1] = g2
                vertexGroups[v1] = g2
                vertexGroups[v2] = g2
            } else {
                return false
            }
        }
        return true
    }

    const parent = v => {
        if (vertexGroups[v] === 0) return -1
        let g = vertexGroups[v]
        while (g !== groupParents[g]) g = groupParents[g]
        return g
    }

    let edgeIdx = 0
    while (verts > 2) {
        const [v1, v2] = edges[edgeIdx++]
        if (union(v1, v2)) --verts
    }

    let removed = 0
    for (const [v1, v2] of edges) {
        if ((vertexGroups[v1] = parent(v1)) !== (vertexGroups[v2] = parent(v2))) ++removed
    }

    if (removed === wanted) return vertexGroups
    return null
}

const solve = ([edges, vertids]) => {
    while (true) {
        const groups = findGroups(vertids.size, edges, 3)
        if (groups !== null) {
            const first = groups.filter(f => f === groups[0]).length
            return first * (vertids.size - first)
        }
    }
}

const part1 = input => solve(parseInput(input))

const part2 = input => 'Just solve todays part 1 and both parts of every other day!'

module.exports = { part1, part2 }
