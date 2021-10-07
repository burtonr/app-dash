FROM node:16-alpine
WORKDIR /server

ENV NODE_ENV=docker

RUN chown node:node /server
USER node

COPY --chown=node:node src/package*.json ./

RUN npm install

COPY --chown=node:node src/ ./

CMD ["node", "server.js"]
