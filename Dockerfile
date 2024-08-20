FROM node:20 AS build
WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:20-alpine

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build/ /usr/src/app

CMD [ "npm", "run", "start" ]
