import { input } from "../unsuck.js";

const pairs = input('input13', '\n\n').map(x => x.split('\n').map(y => JSON.parse(y))),
    n = 'number', f = (p, n) => p.length == 1 && typeof p[0] == 'object' && p[0][0] == n,
    ap = [[[2]], [[6]], ...pairs.reduce((a, [b, c]) => [...a, b, c], [])].sort(pcmp);

function pcmp(a, b) {
    (typeof a !== typeof b) && ((typeof a == n) && (a = [a]) || (typeof b == n)
        && (b = [b]));
    if (typeof a == n) {
        return a - b;
    } else {
        const len = Math.min(a.length, b.length);
        for (let i = 0; i < len; i++) {
            const diff = pcmp(a[i], b[i]);
            if (diff !== 0) return diff;
        }
        return a.length - b.length;
    }
}

console.log(pairs.map(([a, b], i) => (pcmp(a, b) < 0) * (i + 1)).sum());
console.log((ap.findIndex(x => f(x, 2)) + 1) * (ap.findIndex(x => f(x, 6)) + 1))