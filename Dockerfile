FROM node:16-alpine as build-stage

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --only=development
COPY . .
RUN yarn build


FROM node:16-alpine as serve-stage

ENV NODE_ENV production

USER node
WORKDIR /app

COPY --from=build-stage /app/package.json ./
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/dist ./dist

CMD ["yarn", "start:prod"]
