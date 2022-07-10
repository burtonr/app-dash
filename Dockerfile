# FROM node:16-alpine as build
# WORKDIR /app

# COPY package*.json ./
# COPY public/ ./public/

# RUN npm ci --silent
# RUN npm install react-scripts@4.0.3 -g --silent

# COPY src/ ./src/

# RUN npm run build

# FROM nginx:stable-alpine
# RUN apk add --no-cache jq

# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80

# COPY docker-entrypoint.sh /
# ENTRYPOINT ["/docker-entrypoint.sh"]
# CMD ["nginx", "-g", "daemon off;"]

# FROM node:16-alpine
# WORKDIR /server

# ENV NODE_ENV=docker

# RUN chown node:node /server
# USER node

# COPY --chown=node:node src/package*.json ./

# RUN npm install

# COPY --chown=node:node src/ ./

# CMD ["node", "server.js"]
