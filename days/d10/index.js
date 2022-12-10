import { input } from "../unsuck.js";

const instructions = input('input10', '\n', ' ');

function* run(p) {
    let x = 1, pc = 0;
    for (const i of p)
        switch (i[0]) {
            case 'noop':
                yield [x, ++pc];
                break;
            case 'addx':
                yield [x, ++pc];
                yield [x, ++pc];
                x += i[1] - 0;
                break;
        }
    return;
}

const r = run(instructions).collect()

console.log(r.filter(x => (x[1] - 20) % 40 == 0).map(y => y[0] * y[1]).sum());
console.log(r.map(x => Math.abs(x[0] - ((x[1] - 1) % 40)) <= 1)
    .by(40).map(row => row.map(px => px ? '#' : ' ').join(''))
    .collect().join('\n'))