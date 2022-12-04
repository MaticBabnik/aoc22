import { input } from "../unsuck.js";
const ip = input('input4', '\n', ',').map(x => x.map(y => y.split`-`.map(z => z - 0))),

    fo = ([a, c], [b, d]) => (a <= b && c >= d) || (b <= a && d >= c),
    po = ([a, c], [b, d]) => (a <= b && c >= b) || (b <= a && d >= a),

    a = ip.map(x => fo(...x)).filter(x => x).length,
    b = ip.map(x => po(...x)).filter(x => x).length;

console.log({ a, b });