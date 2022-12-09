import { input } from "../unsuck.js";
const trees = input('input8', '\n').map(x => x.split``.map(x => x - 0));

function gt(x, y) {
    return trees[y]?.[x] ?? -1;
}

function col(arr, x) {
    return arr.map(r => r[x]);
}

function isVisible(x, y) {
    const s = trees.length;
    if ((x == 0 || x == s - 1) || (y == 0 || y == s - 1)) return true;

    const me = trees[y][x],
        tl = trees[y].slice(0, x),
        tr = trees[y].slice(x + 1);
    if (Math.max(...tl) < me || Math.max(...tr) < me) return true;

    const c = col(trees, x),
        tu = c.slice(0, y),
        td = c.slice(y + 1);
    if (Math.max(...tu) < me || Math.max(...td) < me) return true;
    return false;
}

function a(x, l) {
    if (x == -1) return l;
    return x + 1;
}

function score(x, y) {
    const me = trees[y][x],
        tl = trees[y].slice(0, x),
        tr = trees[y].slice(x + 1),
        c = col(trees, x),
        tu = c.slice(0, y),
        td = c.slice(y + 1);

    const up = a(tu.reverse().findIndex(x => x >= me),tu.length),
        down = a(td.findIndex(x => x >= me),td.length),
        left = a(tl.reverse().findIndex(x => x >= me),tl.length),
        right = a(tr.findIndex(x => x >= me),tr.length);

        return up * down * left * right;
}

console.log(trees.flatMap((tx, y) => tx.filter((_, x) => isVisible(x, y))).length);
console.log(Math.max(...trees.flatMap((tx, y) => tx.map((_, x) => score(x, y)))));