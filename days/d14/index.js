import { input } from '../unsuck.js';
const { max, min, abs } = Math;

const op = input('input14', '\n', ' -> ', ',').map(ln => ln.map(p => p.map(c => c - 0)));

function line(arr, p1, p2) {
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1], n = max(abs(dx), abs(dy));
    if (dx == 0)
        for (let y = 0, i = 0; i <= n; i++, y += (dy > 0) ? 1 : -1)
            arr[p1[1] + y][p1[0]] = '#';
    else
        for (let x = 0, i = 0; i <= n; i++, x += (dx > 0) ? 1 : -1)
            arr[p1[1]][p1[0] + x] = '#';
}

function gf(p) {
    const [xc, yc] = p.flat(3).by(2).collect().reduce((a, [x, y]) => [[...a[0], x], [...a[1], y]], [[], []])
    const ym = max(...yc) + 2, EXPAND = ym;
    const xo = min(...xc), w = max(...xc) - xo + 2 * EXPAND;
    const arr = [...Array(ym + 1)].map(() => [...Array(w + 2)].map(() => '.'));

    for (const ls of p) {
        for (let i = 0; i < ls.length - 1; i++) {
            const p1 = [ls[i][0] - xo + EXPAND, ls[i][1]], p2 = [ls[i + 1][0] - xo + EXPAND, ls[i + 1][1]]
            line(arr, p1, p2);
        }
    }

    return [500 - xo + EXPAND, arr];
}


function spawnSand(arr, x, y) {
    const maxX = arr[0].length;
    if (arr[y][x] == 'o') return false;
    arr[y][x] = 'o';
    while (true) {
        y++;
        if (y >= arr.length) {
            arr[y - 1][x] = '.';
            return false;
        }
        if (arr[y][x] == '.') {
            arr[y - 1][x] = '.';
            arr[y][x] = 'o';

        }
        else if (x > 0 && arr[y][x - 1] == '.') {
            arr[y - 1][x] = '.';
            x--;
            arr[y][x] = 'o';
        }
        else if (x < maxX - 1 && arr[y][x + 1] == '.') {
            arr[y - 1][x] = '.';
            x++;
            arr[y][x] = 'o';
        }
        else {
            y--;
            break;
        }
    }
    return true;
}

(() => {
    const [sandX, arr] = gf(op);
    let n = 0;
    while (spawnSand(arr, sandX, 0)) n++;
    console.log(n);
})();

(() => {
    const [sandX, arr] = gf(op);
    line(arr, [0, arr.length - 1], [arr[0].length - 1, arr.length - 1])
    let n = 0;
    while (spawnSand(arr, sandX, 0)) n++;
    console.log(n);
})();