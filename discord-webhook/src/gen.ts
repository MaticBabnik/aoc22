import { readFileSync } from 'fs';
import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer';

import { ILeaderboard, ILeaderboardUser } from './api';

const hToMs = (x: number) => (x) * 60 * 60 * 1000;

const template = readFileSync('template.html').toString();

function timestampToLocalTime(ts?: number) {
    if (!ts) return '';
    ts *= 1000; // UNIX is in seconds, JS uses ms
    const time = new Date(ts);

    const locale = process.env.LOCALE ?? 'sl-SI';
    return time.toLocaleTimeString(locale, {
        timeZone: process.env.TZ ?? 'Europe/Ljubljana',
        hour: 'numeric',
        minute: '2-digit',
    });
}

function buildUserHTML(user: ILeaderboardUser, index: string, day: number, bestP1: number, bestP2: number) {
    let s1 = user.completion_day_level[day]?.[1]?.get_star_ts;
    let s2 = user.completion_day_level[day]?.[2]?.get_star_ts
    return `<tr>
                <td>${index}</td>
                <td>${user.name}</td>
                <td>${timestampToLocalTime(s1) + (s1 == bestP1 ? ' 🏆' : '')}</td>
                <td>${timestampToLocalTime(s2) + (s2 == bestP2 ? ' 🏆' : '')}</td>
                <td>${user.local_score}</td>
            </tr>`
}

function bestSolve(leaderboard: ILeaderboard, day: number, part: 1 | 2) {
    const members = Object.values(leaderboard.members);
    const timestamps = members.map(m => m.completion_day_level[day]?.[part]?.get_star_ts);
    const valid = timestamps.filter(x => x !== undefined) as number[];
    return Math.min(...valid);
}

function pad(n: number, digits: number) {
    return `${'0'.repeat(digits - 1)}${n}`.slice(-digits);
}

export function buildHTML(leaderboard: ILeaderboard, maxInactiveH: number) {
    const date = new Date();
    const day = date.getDate() - (date.getHours() < 3 ? 1 : 0); //FIXME: kinda hardcoded for European timezones

    if (day > 25) return `<h1>Nekdo je pozabil ugasniti webhook</h1>`;

    let t = template.replace('<!--day-->', `0${day}`.slice(-2));

    const people = Object.values(leaderboard.members).sort((a, b) => b.local_score - a.local_score);

    const now = Date.now();

    const lastOnLeaderboard = [...people].reverse().find(x => now - 1000 * x.last_star_ts < hToMs(maxInactiveH));
    const endIndex = lastOnLeaderboard ? people.indexOf(lastOnLeaderboard) : 5; //try to show at least the first 5

    console.log({ lastOnLeaderboard, endIndex })

    const filteredPeople = people.slice(0, endIndex);
    const p1b = bestSolve(leaderboard, day, 1),
        p2b = bestSolve(leaderboard, day, 2);


    let digits = Math.floor(Math.log10(filteredPeople.length - 1)) + 1;
    if (digits <= 0) digits = 1; // idk;

    const leaderboardMembers = filteredPeople.sort((a, b) => b.local_score - a.local_score);
    const usersHtml = leaderboardMembers.map((lm, i) => buildUserHTML(lm, pad(i, digits), day, p1b, p2b)).join('\n');

    return t.replace('<!--players-->', usersHtml);
}

function getPuppeteerConfig(): PuppeteerLaunchOptions {
    const uid = process.geteuid?.() ?? 1000;

    if (uid === 0) {
        console.log('Running as root. Using docker defaults...');
        return {
            headless: true,
            args: [
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable-setuid-sandbox",
                "--no-sandbox",
            ]
        }
    } else return {
        headless: false
    };
}

export async function getImageBuffer(leaderboard: ILeaderboard, maxInactiveH: number) {
    console.log('Building HTML...')
    const html = buildHTML(leaderboard, maxInactiveH);

    console.log('Launching browser...')
    const browser = await puppeteer.launch(getPuppeteerConfig());

    const page = await browser.newPage();
    page.setContent(html);

    console.log('Waiting for network...')
    await page.waitForNetworkIdle({ idleTime: 100, timeout: 100_000 });

    await page.waitForSelector('body');
    const body = await page.$('body');
    if (!body) throw "No body";

    console.log('Taking screenshot...')
    const buffer = await body.screenshot({
        type: 'png',
        captureBeyondViewport: true,
    });
    browser.close();

    return buffer;
}