FROM node:14


MAINTAINER Markeidus Hall II

WORKDIR /custom-pc-builder
COPY . /custom-pc-builder

RUN npm ci

ENTRYPOINT ["npm", "run", "serve"]