FROM node:16-alpine as build
WORKDIR /app

# NPM package.json and package.lock.json
COPY package*.json ./

# babel.config.json and webpack.config.json
COPY *.config.* ./

RUN npm ci --silent

# React source code
COPY src/ ./src/

# index.html and favicon.ico
COPY public/ ./public/

RUN npm run build

# Runtime image/layer
FROM node:16-alpine as server
WORKDIR /app-dash

# Set production environment to prevent devDependencies being installed
ENV NODE_ENV=production

# Compiled React code
COPY --from=build /app/public ./public

# NPM package.json and package.lock.json
COPY package*.json ./

# Node API source code.
# Nested directory to match with the `express.static` path in server.js
COPY server/ ./server

RUN npm ci --silent

# Run the API
CMD ["node", "server/server.js"]
