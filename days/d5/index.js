import { input } from "../unsuck.js";
let [s, i] = input('input5', '\n\n', '\n')

let stack = s.map(x => (x + ' ').split('').by(4).map(y => y[1]).collect())
    .slice(0, -1)
    .reverse().reduce((a, c) => {
        c.forEach((z, i) => {
            if (z != ' ')
                a[i].push(z);
        })
        return a;
    }, [...Array(Math.round(s[0].length / 4))].map(x => Array()));

const s2 = JSON.parse(JSON.stringify(stack)); //backup

i.map(x => x.match(/\w* (\d*) \w* (\d*) \w* (\d*)/).slice(1, 4).map(y => y - 0))
    .forEach(([n, f, t]) => [...Array(n)].forEach(_ => stack[f - 1].length && stack[t - 1].push(stack[f - 1].pop())));

console.log(stack.map(x => x.at(-1)).join(''))

stack = s2; //load backup
i.map(x => x.match(/\w* (\d*) \w* (\d*) \w* (\d*)/).slice(1, 4).map(y => y - 0))
    .forEach(([n, f, t]) => {
        const r = [];
        [...Array(n)].forEach(() => {
            stack[f - 1].length && r.push(stack[f - 1].pop());
        });
        stack[t - 1] = [...stack[t - 1], ...r.reverse()]
    });

console.log(stack.map(x => x.at(-1)).join(''))