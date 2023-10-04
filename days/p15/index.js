import { input } from '../unsuck.js';

const map = input('input15t', '\n').map(l => l.split('').map(n => n - 0));

console.log(map);

function dijkstra(costs, start, end) {
    let c = costs.map((x) => x.map((y) => Infinity));
    let p = costs.map((x) => x.map((y) => 0));

    c[start[0]][start[1]] = 0;

    let q = [start];

    while (q.length) {
        const node = q.shift();
        const cost = c[node[0]][node[1]];
        const neighbors = [
            [node[0] - 1, node[1]],
            [node[0] + 1, node[1]],
            [node[0], node[1] - 1],
            [node[0], node[1] + 1],
        ].filter(([x, y]) => x >= 0 && y >= 0 && x < costs.length && y < costs[0].length);

        for (const neighbor of neighbors) {
            const newCost = cost + costs[neighbor[0]][neighbor[1]];
            if (newCost < c[neighbor[0]][neighbor[1]]) {
                c[neighbor[0]][neighbor[1]] = newCost;
                q.push(neighbor);
            }
        }

    }

}