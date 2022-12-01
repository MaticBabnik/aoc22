const { readFileSync } = require('fs')

const cal = readFileSync('input1').toString()
    .split('\n\n')
    .map(x => x.split('\n').map(y => y - 0).reduce((p, c) => c + p))
    .sort();

console.log({ p1: cal.at(-1) });
console.log({ p2: cal.slice(-3).reduce((p, c) => c + p) });