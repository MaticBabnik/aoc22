import { input } from "../unsuck.js";
const cmds = input('input7', '$').map(x => x.trim().split('\n')).slice(1);

const tree = { c: {}, f: {} };
let path = [];

function run(cmd, ...output) {
    cmd = cmd.split(' ');
    switch (cmd[0]) {
        case "ls":
            let n = tree;
            for (let d of path) {
                if (!(d in n.c))
                    n.c[d] = { c: {}, f: {} };
                n = n.c[d];
            }
            const ent = output.map(l => l.split(' '))
            ent.filter(x => x[0] != 'dir').forEach(y => n.f[y[1]] = y[0] - 0);
            ent.filter(x => x[0] == 'dir').forEach(y => n.c[y[1]] = { c: {}, f: {} });
            break;
        case 'cd':
            if (cmd[1] == '/') path = [];
            else if (cmd[1] == '..') path.pop();
            else path.push(cmd[1]);
    }
}
const sz = tn => Object.values(tn.f ?? {}).sum() + Object.values(tn.c ?? {}).map(x => sz(x)).sum();
cmds.forEach(x => run(...x));
const sizes = [];

const sz2 = tn => {
    const size = Object.values(tn.f ?? {}).sum() + Object.values(tn.c ?? {}).map(x => sz2(x)).sum();
    sizes.push(size);
    return size;
}

const FS_ALL = 70000000;
const FS_RQ = 30000000;
const fs = sz2(tree);

let minDel = FS_RQ - (FS_ALL - fs);
console.log(sizes.filter(x=>x<100000).sum())
console.log(Math.min(...sizes.filter(x => x > minDel)));