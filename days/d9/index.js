import { input } from "../unsuck.js";

const vav = (v1, v2) => v1.map((x, i) => x + v2[i]),
    vsv = (v1, v2) => v1.map((x, i) => x - v2[i]),
    vmd = (v1, v2) => Math.max(...vsv(v1, v2).map(x => Math.abs(x))),
    vclamp = (v) => v.map(x => Math.min(Math.max(-1, x), 1)),
    vecs = { U: [0, -1], L: [-1, 0], R: [1, 0], D: [0, 1] }

const moves = input('input9', '\n', ' ').reduce((a, [d, l]) => [...a, ...[...Array(l - 0)].map(_ => vecs[d])], []);

{
    let h = [0, 0], t = [0, 0], tp = [[0, 0]];

    for (const m of moves) {
        h = vav(h, m);
        if (vmd(h, t) > 1) {
            t = vav(t, vclamp(vsv(h, t)));
            tp.push(t.join(','));
        }
    }
    console.log(new Set(tp).size);
}

{
    let knots = [...Array(10)].map(x => [0, 0]), tp = [0, 0];

    for (const m of moves) {
        knots[0] = vav(knots[0], m);

        for (let i = 1; i < 10; i++) {
            let h = knots[i - 1];

            if (vmd(h, knots[i]) > 1) {
                knots[i] = vav(knots[i], vclamp(vsv(h, knots[i])));
                if (i == 9) tp.push(knots[i].join(','));
            }
        }
    }
    console.log(new Set(tp).size);
}
