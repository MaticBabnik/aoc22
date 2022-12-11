import { input } from "../unsuck.js";

const monkeys = input("input11", '\n\n')
    .map(x => x.match(/(\d*):.*?items: ((?:\d+,? ?)*).*?new = ((?:old|\d+) (?:\*|\+) (?:old|\d+)).*?by (\d+).*?monkey (\d+).*?monkey (\d+)/s))
    .reduce((acc, [_, id, items, fb, div, tid, fid]) => (acc[id - 0] = { i: items.split(', ').map(tm => tm - 0), fn: new Function('old', `return ${fb}`), d: div - 0, t: tid - 0, f: fid - 0 }) && acc, {})


const d = Object.values(monkeys).map(m => m.d).reduce((a, x) => a * x);
const inspects = Object.keys(monkeys).reduce((acc, x) => ({ ...acc, [x]: 0 }), {});

for (let i = 0; i < 10000; i++) {
    for (const mid in monkeys) {
        const m = monkeys[mid];
        while (m.i.length > 0) {
            let item = m.i.shift();

            item = m.fn(item) % d;
            if (item % m.d == 0) {
                monkeys[m.t].i.push(item % d);
            } else {
                monkeys[m.f].i.push(item % d);
            }
            inspects[mid]++;
        }
    }
}

console.log(Object.values(inspects).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b));