import { input } from "../unsuck.js"

const [a, S, E] = ['a', 'S', 'E'].map(x => x.charCodeAt(0));
const map = input('input12', '\n').map(x => x.split('').map(y => y.charCodeAt(0) - a));

function findPoint(map, n) {
    //find n in 2d array
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === n) return [i, j];
        }
    }
    return undefined;
}

const start = findPoint(map, S - a);
const end = findPoint(map, E - a);

map[start[0]][start[1]] = 0;
map[end[0]][end[1]] = 26;

function getEmptyNeighbors(map, [x, y]) {
    return [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].filter(([x, y]) => map[y] && map[y][x] == false);
}

function prF(mp) {
    console.log(mp.map(x => x.map(y => y ? '#' : ' ').join('')).join('\n'));
}

function doFlood(map, start, end) {
    let vm = map.map(x => x.map(y => false));
    vm[start[0]][start[1]] = true;

    let n = 0;
    while (vm[end[0]][end[1]] === false) {
        let next = vm.map(x => x.map(y => y));
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (vm[y][x])
                    getEmptyNeighbors(vm, [x, y]).forEach(([nx, ny]) => {
                        if (map[ny][nx] - 1 <= map[y][x])
                            next[ny][nx] = true;
                    });
            }
        }
        vm = next;
        n++;
    }
    return n;
}

function floodTo0(map, start, extra) {
    let vm = map.map(x => x.map(y => false));
    vm[start[0]][start[1]] = true;

    let n = 0;
    while (true) {
        let next = vm.map(x => x.map(y => y));
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (vm[y][x])
                    for (let [nx, ny] of getEmptyNeighbors(vm, [x, y])) {
                        if (map[ny][nx] + 1 >= map[y][x]) {
                            if (map[ny][nx] == 0) return n + 1;
                            next[ny][nx] = true;
                        }
                    }
            }
        }
        vm = next;
        // prF(next);
        n++;
    }
    return n;
}

console.log({ start, end });
console.profile('d12')
console.log(doFlood(map, start, end));
console.log(floodTo0(map, end));
console.profileEnd('d12')
