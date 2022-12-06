import { input } from "../unsuck.js";

const i = input('./input6', ''),
    u = a => Object.keys(a.reduce((p, c) => ({ [c]: 1, ...p }), {})).length == a.length,
    s = n => [...Array(i.length - n)].map((_, i) => i).find(x => u(i.slice(x, x + n))) + n;

console.log([s(4), s(14)]);