import { input } from "../unsuck.js";

const dec = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 },
    win = { 1: 2, 2: 3, 3: 1 },
    lose = { 1: 3, 2: 1, 3: 2, },
    wld = {
        1: x => lose[x],
        2: x => x, //draw
        3: x => win[x],
    };

const com = input('input3', '\n')
    .map(x => x.split(' ').map(y => dec[y]));

const score = x => x.map(([h, m]) => h == m ? m + 3 : (win[h] == m ? m + 6 : m)).reduce((p, c) => c + p);

const cal = score(com), cal2 = score(com.map(([a, b]) => [a, wld[b](a)]))

console.log({ cal, cal2 })