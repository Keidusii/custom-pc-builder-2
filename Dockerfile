FROM node:14

WORKDIR /custom-pc-builder
COPY . /custom-pc-builder

RUN npm ci && cd server && npm ci

WORKDIR /custom-pc-builder/server

ENTRYPOINT ["npm", "start"]