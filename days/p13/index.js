import { input } from "../unsuck.js";


const [d, f] = input('input12t', '\n\n', '\n');
const AtI = { x: 0, y: 1 };
const dots = d.map(ln => ln.split(',').map(x => x - 0));
f.slice(0, 1).map(ln => ln.match(/(x|y)=(\d+)/)).map(m => [AtI[m[1]], m[2] - 0]).forEach(([a, n]) => {
    console.log(`Fold [${a}] @ ${n}`)
    dots.forEach((d, i) => dots[i][a] <= n || (dots[i][a] = n + (n - d[a])));
})

const dedup = i => Object.entries(i.reduce((a, d) => ((a[d[0]] = [d[1], ...(a?.[d[0]] ?? [])]) && a), {})).flatMap(([x, ys]) => [...new Set(ys)].map(y => [x, y]));
console.log(dedup(dots).length);


f.slice(1).map(ln => ln.match(/(x|y)=(\d+)/)).map(m => [AtI[m[1]], m[2] - 0]).forEach(([a, n]) => {
    console.log(`Fold [${a}] @ ${n}`)
    dots.forEach((d, i) => dots[i][a] <= n || (dots[i][a] = n + (n - d[a])));
});

const w = Math.max(...dots.map(d => d[0]))+1, h = Math.max(...dots.map(d => d[1]))+1;
const r = [...Array(h)].map((_)=>[...Array(w)].map(a=>' '));

dots.forEach(([x,y])=>r[y][x] = '#')

console.log(r.map(x=>x.join('')).join('\n'));