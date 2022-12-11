import { input } from "../unsuck.js";

const monkeys = input("input11t", '\n\n')
    .map(x => x.match(/(\d*):.*?items: ((?:\d+,? ?)*).*?new = ((?:old|\d+) (?:\*|\+) (?:old|\d+)).*?by (\d+).*?monkey (\d+).*?monkey (\d+)/s))
    .reduce((acc, [_, id, items, fb, div, tid, fid]) => (acc[id - 0] = { i: items.split(', ').map(tm => tm - 0), fn: new Function('old', `return ${fb}`), d: div - 0, t: tid - 0, f: fid - 0 }) && acc, {})


const inspects = Object.keys(monkeys).reduce((acc, x) => ({...acc, [x]: 0}), {});

for (let i = 0; i < 20; i++) {
    for (const mid in monkeys) {
        const m = monkeys[mid];
        while (m.i.length > 0) {
            let item = m.i.shift();
            
            item = Math.floor(m.fn(item) / 3);
            if (item % m.d == 0) {
                monkeys[m.t].i.push(item);
            } else {
                monkeys[m.f].i.push(item);
            }
            inspects[mid]++;
        }
    }
}
console.log(monkeys);
console.log(Object.values(inspects).sort((a, b) => b-a).slice(0,2).reduce((a, b) => a * b));