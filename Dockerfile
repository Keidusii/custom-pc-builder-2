FROM node:14


MAINTAINER Markeidus Hall II

ARG codeArtifactToken

WORKDIR /custom-pc-builder
COPY . /custom-pc-builder

RUN npm ci

ENTRYPOINT ["npm", "run", "serve"]