import { input } from "../unsuck.js";

const nodes = {};

const defs = input('input12t', '\n', '-');

defs.forEach(([a, b]) => {
    if (!nodes[a]) nodes[a] = [];
    if (!nodes[b]) nodes[b] = [];

    if (a != 'end' && b != 'start')
        nodes[a].push(b);
    if (b != 'end' && a != 'start')
        nodes[b].push(a);
});

function isUpper(str) {
    return str == str.toUpperCase();
}

function pathsOnce(p) {
    if (p.at(-1) == 'end') return [p];
    const next = nodes[p.at(-1)].filter(x => !p.includes(x) || isUpper(x));

    if (next.length == 0) {
        return [];
    }

    return next.map(x => pathsOnce([...p, x])).flat();
}

function smallTwice(p) {
    const small = p.filter(x => !isUpper(x));
    return small.length == new Set(small).size;
}

function pathsTwice(p) {
    if (p.at(-1) == 'end') return [p];

    const next = smallTwice(p) ? nodes[p.at(-1)] : nodes[p.at(-1)].filter(x => !p.includes(x) || isUpper(x))

    if (next.length == 0) {
        return [];
    }

    return next.map(x => pathsTwice([...p, x])).flat();
}

console.log(pathsOnce(['start']).length);
console.log(pathsTwice(['start']).length);