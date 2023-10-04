/*
Matic Babnik 
matic@babnik.io
Vegova Ljubljana
*/

/**
 * je niz cik-cak
 * @param {string} str 
 * @returns {boolean}
 */
function nizcc(str) {
    //slaba resitev (za berljivost) ampak, ne uporabimo arrayov
    let c = str[0];
    let n = 0;
    let d = null;
    let pn = NaN;

    for (let i = 0; i < str.length; i++) {
        if (str[i] == c) {
            n++;
        } else {
            if (pn == n) return false;
            let cd = n > pn;
            if (!isNaN(pn)) {
                if (d === cd) { // ce se smer ni spremenila, ni cik cak
                    return false;
                }
                d = cd;
            }
            c = str[i];
            pn = n;
            n = 1;
        }
    }
    return true;
}

/**
 * Util za `histogramVoda`
 * @param {number[]} r 
 * @param {number} f 
 * @param {number} t 
 * @returns {number}
 */
function scan(r, f, t) {
    return Math.max(...r.slice(f, t), 0); //najvisji stolpec od iz obmocja [f,t)
}

/**
 * @param {number[]} hist 
 * @returns {number}
 */
function histogramVoda(st) {
    let c = 0;
    for (let i = 0; i < st.length; i++) {
        const wl = Math.min(scan(st, 0, i), scan(st, i, st.length)); // "najmanjsa" visina  najvisjih sten na levi in desni
        c += Math.max(wl - st[i], 0);
    }
    return c;
}

// console.log(histogramVoda([5, 3, 2, 4, 1]));
// console.log(histogramVoda([2, 3, 5, 1, 4]));
// console.log(histogramVoda([5, 1, 3, 2, 4]));
// console.log(histogramVoda([5, 1, 4, 2, 3]));

/**
 * hh:mm
 * @param {string} hhmm 
 */
function toSec(hhmm) {
    let [h, m] = hhmm.split(':').map(x => x - 0);
    return (h * 60 + m) * 60 - 3600 * 7;
}

/**
 * 
 * @param {string[]} ljudje 
 * @param {number} tm 
 * @param {number} n 
 * @returns 
 */
function aGre(ljudje, tm, n) {
    let t = ljudje.map(x => toSec(x)); //pretvorimo case v sekunde od 7:00

    t.sort((a, b) => a - b); //sortiramo
    let ct = 0;
    while (t.length > 0) { //dokler so ljudje v vrsti
        let busy = t.splice(0, n); //testiramo ljudi
        ct += tm; //to traja cas
        if (busy.at(-1) < ct || 0 in t && t[0] < ct) { // pogledamo ce je kdo zamudil
            return -1; // ni zadosti postaj
        }
    }
    return 0; //postaj je zadosti (ali vec)
}

/**
 * Rezultat je tocen ker:
 * uporabjam "bruteforce" nacin (simuliram testiranje z n postajami) 
 * (((ampak za hitrost n iscem z (skoraj) binarnim iskanjem)))
 * @param {string[]} ljudje ure za ljudi v formatu 'hh:mm'
 * @param {number} tm cas testiranja v s
 * @returns {number} koliko postaj za testiranje rabimo
 */
function bsHitroTestiranje(ljudje, tm) {
    let min = 1;
    let max = ljudje.length;
    let mid;
    while (max > min) { // binarno iskanje (skoraj, nism 100%)
        mid = Math.round((max + min) / 2)
        const gre = aGre(ljudje, tm, mid) == 0;

        if (gre) {
            max = mid;
            if (max - min == 1) return mid; //da se ne zataknemo
        } else {
            min = Math.max(mid, min + 1);
        }
    }
    return mid;
}

// console.log(bsHitroTestiranje(['7:04', '7:05', '7:08'], 220));

/**
 * 
 * @param {string} a 
 * @returns 
 */
function jePalindrom(a, o, l) {
    const al = l - 1;
    for (let i = 0; i < al + 1 / 2; i++) {
        if (a[o + i] != a[o + al - i]) return false; //ce nasprotna znaka nista ista... ni palindrom
    }
    return true;
}

/**
 * Deluje "hitro" tudi za dolge nize
 * @param {string} str 
 * @returns 
 */
function podpalindromi(str) {
    let n = 0;
    const sl = str.length;
    for (let i = sl - 1; i >= 2; i--) { //vse mozne dolzine
        for (let j = 0; j <= sl - i; j++) { //vsi mozni offseti
            if (jePalindrom(str, j, i)) n++; // a je?
        }
    }
    return n;
}

/**
 * Kam vse lahko pridemo iz "iz" preko "pr" 
 * @param {number} iz 
 * @param {Set[]} pr 
 * @param {number[]} bl ban list (da preprecimo neskoncno rekurzijo) 
 */
function kam(iz, pr, bl = [iz]) {
    const nfp = pr.filter(x => x.has(iz)).flatMap(y => [...y].filter(z => !bl.includes(z)));
    if (nfp.length == 0) return [];
    const nfrp = nfp.flatMap(x => kam(x, pr, [...bl, x])) ?? [];
    const join = [...nfp, ...nfrp]
    return join;
}

/**
 * 
 * @param {number} n st jam
 * @param {number} m st prehodov
 * @param {number} s zacetna jama
 * @param {number} t koncna jama
 * @param {number[]} a prehod iz
 * @param {number[]} b prehod v
 * @param {number[]} c zvitek iz
 * @param {number[]} d zvitek v
 * @returns 
 */
function jame(n, m, s, t, a, b, c, d) {
    const prehodi = [];

    for (let i = 0; i < m; i++) {
        prehodi.push(new Set([a[i], b[i]])) //dodamo zacetne prehode
    }

    const zvitki = c.map((x, i) => [x, i + 1])
        .filter(([k, j]) => k != -1).map(([_, ja]) => ja); //kje so zvitki
    console.log({ zvitki });

    while (true) {

        const moznosti = kam(s, prehodi, [s]);
        if (moznosti.includes(t)) return true; //lahko pridemo na konec?

        const zj = zvitki.find(zv => moznosti.includes(zv));
        if (!zj) return false; //ni konca,ni zvitkov ni mogoce

        prehodi.push(new Set([c[zj - 1], d[zj - 1]])); // vsaj en zvitek je se na voljo
        // mogoce lahko z novim prehodom pridemo na konec
        // se vidimo v naslednji iteraciji
    }

    //casovna kompleksnost: zelo
    /*

    g je globina (max razdalja v prehodih med 2 jamama)
    z je stevilo zvitkov
    n je stevilo jam
    priblizno stevilo operacij (worst case) = z * n^g
    */
}


// console.log(jame(
//     6, //jame
//     4, //prehodi
//     1, //iz
//     5, //v
//     [1, 1, 2, 3],
//     [6, 2, 4, 5],
//     [-1, -1, -1, -1, -1, 3],
//     [-1, -1, -1, -1, -1, 4],
// ));