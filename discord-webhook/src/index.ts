import { config } from "dotenv";
import { schedule } from "node-cron"
import { WebhookClient } from "discord.js"

import { get } from "./api";
import { getImageBuffer } from "./gen";

async function main(leaderboardId: string, sessionCookie: string, webhookUrl: string, maxInactiveH: number) {
    const then = Date.now();

    const leaderboard = await get(leaderboardId, sessionCookie);
    const image = await getImageBuffer(leaderboard, maxInactiveH);

    if (!image) throw "Screenshot failed?";

    const webhook = new WebhookClient({
        url: webhookUrl
    });

    await webhook.send({
        files: [
            { attachment: image }
        ]
    })

    console.log(`Generated image in ${Date.now() - then}ms`)
}

config();
const { LEADERBOARD, SESSION, WEBHOOK, CRON, MAX_INACTIVE_HOURS } = process.env;

if (typeof LEADERBOARD != 'string' || typeof SESSION != 'string' || typeof WEBHOOK != 'string') {
    throw "Missing env";
}
let leaderboard = LEADERBOARD, session = SESSION, webhook = WEBHOOK, maxInactiveH = 24;

if (typeof MAX_INACTIVE_HOURS == 'string') {
    maxInactiveH = parseInt(MAX_INACTIVE_HOURS);
} else if (typeof MAX_INACTIVE_HOURS == 'number') {
    maxInactiveH = MAX_INACTIVE_HOURS;
}

if (typeof CRON == 'string' && CRON != 'FALSE') {
    schedule(CRON, () => {
        try {
            main(leaderboard, session, webhook, maxInactiveH);
        } catch (e) {
            console.error(e);
        }
    })
} else {
    main(leaderboard, session, webhook, maxInactiveH);
}