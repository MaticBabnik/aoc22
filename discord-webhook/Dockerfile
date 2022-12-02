
FROM node:19 AS base

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y chromium fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 fonts-noto-color-emoji \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* 
# ---- everything above is borrowed from https://github.com/puppeteer/puppeteer/blob/main/docker/Dockerfile

FROM base AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i --unsafe-perm

COPY . .

RUN npm run build

#----------------------------------------------------------------------------------------------------------

FROM base
WORKDIR /app

COPY --from=build /app /app
COPY --from=build /root/.cache/puppeteer /root/.cache/puppeteer

RUN npm prune --production; rm -fr src


ENV TZ="Europe/Ljubljana"
ENV CRON="0 0 * 12 *"
ENV LOCALE="sl-SI"
ENV LEADERBOARD='<replace me>'
ENV WEBHOOK='<replace me>'
ENV SESSION='<replace me>'

CMD node /app/build/index.js