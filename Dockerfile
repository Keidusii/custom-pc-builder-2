FROM node:14-slim as build

WORKDIR /custom-pc-builder 
COPY . /custom-pc-builder
RUN npm ci
RUN npm run build

FROM node:14-slim
WORKDIR /custom-pc-builder 
COPY --from=build custom-pc-builder/dist ./dist
COPY --from=build custom-pc-builder/server ./server
WORKDIR /custom-pc-builder/server
RUN npm ci --production
EXPOSE 5002

ENTRYPOINT ["npm", "run", "prod"]
