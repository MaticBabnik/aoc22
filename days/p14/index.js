import { input } from "../unsuck.js";

const [[c], r] = input('input14', '\n\n', '\n');

const then = Date.now();

const rules = r.map(x => x.split(' -> ')).reduce((a, c) => ({ ...a, [c[0]]: [c[0].charAt(0) + c[1], c[1] + c[0].charAt(1)] }), {});
let pairs = [...Array(c.length - 1)].map((_, i) => c.slice(i, i + 2)).freq();

function poly(p, r) {
    const out = {};
    for (const [pair, n] of Object.entries(p)) {
        if (r[pair]) {
            if (!(r[pair][0] in out)) out[r[pair][0]] = 0;
            if (!(r[pair][1] in out)) out[r[pair][1]] = 0;
            out[r[pair][0]] += n;
            out[r[pair][1]] += n;
        } else {
            out[pair] = n;
        }
    }
    return out;
}

function pairsToElements(ps) {
    const out = {};
    for (const [pair, n] of Object.entries(ps)) {
        if (!(pair[0] in out)) out[pair[0]] = 0;
        if (!(pair[1] in out)) out[pair[1]] = 0;
        out[pair[0]] += n;
        out[pair[1]] += n;
    }
    return out;
}


for (let i = 0; i < 10; i++) { // 10 steps
    pairs = poly(pairs, rules);
}
{

    const elements = pairsToElements(pairs);
    const freqs = Object.values(elements)
        .map(x => Math.round(x / 2))
        .sort((a, b) => a - b);

    console.log(freqs.at(-1) - freqs[0]);
}

for (let i = 0; i < 30; i++) { // 10 -> 40 steps
    pairs = poly(pairs, rules);
}
{

    const elements = pairsToElements(pairs);
    const freqs = Object.values(elements)
        .map(x => Math.round(x / 2))
        .sort((a, b) => a - b);

    console.log(freqs.at(-1) - freqs[0]);

    console.log(freqs.sum());
}
console.log(`Done in ${Date.now() - then} ms`);