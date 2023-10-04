import { input } from "../unsuck.js";
const v = input('input16t', '\n')
    .map(x => x.match(/([A-Z]{2,2}).*?(\d+);.*?((?:[A-Z]{2,2},?\s?)+)/))
    .reduce((acc, [_, n, p, t]) =>
        (acc[n] = { n, pressure: p - 0, tunnels: t.split(', ') }) && acc, {});

console.log(v);


// function dist(a, b, g, p = []) {
//     if (g[a].tunnels.includes(b)) return 1;
//     else return Math.min(...(g[a].tunnels.map(ns => p.includes(ns) ?
//         Infinity : dist(ns, b, g, [...p, a])))) + 1;
// }

// function stupid(m, n, g, vo = []) {
//     if (m >= 30) return 0;

//     g[n].tunnels.map(nn => stupid(m + 1, nn, g, vo));
//     if (g[n].pressure > 0 && !vo.includes(n)) {
//         const nvo = [...vo, n];
//         g[n].tunnels.map(nn => stupid(m + 2, nn, g, nvo));
//     }
// }

function cantBreathe(v) {
    const di = Object.keys(v).reduce((acc, c, i) => ({ [c]: i, ...acc }), {});
    const n_vert = Object.keys(di).length;

    const dist = [...Array(n_vert)].map(x => [...Array(n_vert)].map(y => null));
    const next = [...Array(n_vert)].map(x => [...Array(n_vert)].map(y => Infinity));

    for (const node in v) {
        for (const n2 of v[node].tunnels) {
            
        }
    }

}

console.log(cantBreathe(v))
