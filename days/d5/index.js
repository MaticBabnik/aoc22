import { input } from "../unsuck.js";

let [s, i] = input('input5', '\n\n', '\n'),
    p = t => console.log(t.map(x => x.at(-1)).join``),
    st = s.map(x => `${x} `.split``.by(4).map(y => y[1]).collect())
        .slice(0, -1).reverse().reduce((a, c) => c.forEach((z, i) => z != ' ' && a[i].push(z)) || a,
            [...Array(Math.round(s[0].length / 4))].map(x => [])),
    z = JSON.parse(JSON.stringify(st)), //backup
    j = i.map(x => x.match(/\d+/g).map(y => y - 1));

j.forEach(([n, f, t]) => [...Array(n + 1)].forEach(_ => st[f].length && st[t].push(st[f].pop())));
p(st);
st = z; //load backup for part 2
j.forEach(([n, f, t]) => (st[t] = [...st[t], ...st[f].slice(-n - 1)]) && (st[f] = st[f].slice(0, -n - 1)));
p(st);