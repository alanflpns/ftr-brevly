FROM node:22.17 AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM base AS build

WORKDIR /usr/src/app

COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

FROM node:lts-alpine3.21 AS deploy

USER 1000

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/infra/http/server.mjs"]