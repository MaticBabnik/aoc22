import { input } from "../unsuck.js";

const sb = input('input15').match(/-?\d+/g).map(x => x - 0).by(4).map(y => [...y.by(2)]).collect();

function taxicab_dist(p1, p2) {
    return Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1]);
}

function row(sen, y) {
    const ranges = [];
    let beaconsInRow = [];

    for (const [s, b] of sen) {
        const d = taxicab_dist(s, b);
        const vd = Math.abs(y - s[1]);
        const rp = d - vd;

        if (b[1] == y) beaconsInRow.push(b[0]);

        if (rp >= 0) {
            ranges.push([s[0] - rp, s[0] + rp]);
        }
    }


    if (ranges.length == 0) return [0];
    const opt = optr(ranges);
    const nOccupied = opt.map(([s, e]) => Math.abs(s - e)).sum();

    if (opt.length > 1) {
        return [nOccupied, y, opt];
    }
    return [nOccupied];
}

function optr(r) {
    r.sort((a, b) => a[0] - b[0]);
    return r.reduce((acc, c) => {
        const li = acc.length - 1;
        if (acc[li][1] >= c[0] || acc[li][1] + 1 == c[0]) {
            if (c[1] > acc[li][1])
                acc[li][1] = c[1];
        } else {
            acc.push(c);
        }
        return acc;
    }, [r[0]]);
}

console.log(row(sb, 10));

const then = Date.now();

let i = 0;
while (i <= 4_000_000) {
    const a = row(sb, i);
    if (a[1]) {
        console.log(a[1] + (a[2][0][1] + 1) * 4_000_000);
        break;
    }
    i++;
}

console.log(`P2 took: ${Date.now() - then}ms`);