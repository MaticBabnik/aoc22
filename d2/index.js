const { readFileSync } = require('fs')


const wm = { // win map
    1: 2,
    2: 3,
    3: 1
}
const lm = { //loose map
    1: 3,
    2: 1,
    3: 2,
}
const wld = { // win,loose,draw functions
    3(x) { return wm[x] },
    1(x) { return lm[x] },
    2(x) { return x },
}

const com = readFileSync('input2').toString()
    .replace(/(A|X)/g, 1)
    .replace(/(B|Y)/g, 2)
    .replace(/(C|Z)/g, 3)
    .split('\n')
    .map(x => x.split(' ').map(y => y - 0))


const cal = com
    .map(([h, m]) => h == m ? m + 3 : (wm[h] == m ? m + 6 : m))
    .reduce((p, c) => c + p);

const cal2 = com
    .map(([a, b]) => [a, wld[b](a)])
    .map(([h, m]) => h == m ? m + 3 : (wm[h] == m ? m + 6 : m))
    .reduce((p, c) => c + p);

console.log({ cal, cal2 })