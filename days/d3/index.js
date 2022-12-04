import { input } from "../unsuck.js";
const ip = input('input3', '\n')

const o = (a, b) => [...new Set(a.filter(x => b.includes(x)))],
    sc = (l) => (l.charCodeAt(0) - 38) % 58;

const a = ip.map(x => ([x.slice(0, x.length / 2), x.slice(x.length / 2)]))
    .map(([a, b]) => sc(o(a.split``, b.split``)[0])).sum();

const b = ip.by(3).map(t => t.map(s => s.split``))
    .map(x => sc(o(x[0], o(x[1], x[2]))[0])).sum();

console.log({ a, b });