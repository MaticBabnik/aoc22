import { input } from "../unsuck.js";
const c = input('input1', '\n\n', '\n').map(x => x.map(y => y - 0).sum()).sort();

console.log({ p1: c.at(-1), p2: c.slice(-3).sum()});
