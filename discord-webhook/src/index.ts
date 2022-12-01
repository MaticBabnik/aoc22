import { config } from "dotenv";
import { schedule } from "node-cron"
import { WebhookClient } from "discord.js"

import { get } from "./api";
import { getImageBuffer } from "./gen";

async function main(leaderboardId: string, sessionCookie: string, webhookUrl: string) {
    const then = Date.now();

    const leaderboard = await get(leaderboardId, sessionCookie);
    const image = await getImageBuffer(leaderboard);

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
const { LEADERBOARD, SESSION, WEBHOOK, CRON } = process.env;

if (typeof LEADERBOARD != 'string' || typeof SESSION != 'string' || typeof WEBHOOK != 'string') {
    throw "Missing env";
}

if (typeof CRON == 'string' && CRON != 'FALSE') {
    schedule(CRON, () => {
        try {
            main(LEADERBOARD, SESSION, WEBHOOK);
        } catch (e) {
            console.error(e);
        }
    })
} else {
    main(LEADERBOARD, SESSION, WEBHOOK);
}