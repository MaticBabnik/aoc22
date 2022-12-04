import { input } from "../unsuck.js";
const ip = input('input4', '\n', ',').map(x => x.map(y => y.split`-`.map(z => z - 0)))

const fo = (a, b) => (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);
const po = (a, b) => (a[0] <= b[0] && a[1] >= b[0]) || (b[0] <= a[0] && b[1] >= a[0]);

const a = ip.map(x => fo(x[0], x[1])).filter(x => !!x).length;
const b = ip.map(x => po(x[0], x[1])).filter(x => !!x).length;

console.log({ a,b });