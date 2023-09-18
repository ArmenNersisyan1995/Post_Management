FROM node:18-alpine

WORKDIR /usr/src/app
COPY . .
COPY init.sql /docker-entrypoint-initdb.d/

WORKDIR /usr/src/app/frontend

RUN npm install && npm run build && rm -rf node_modules

WORKDIR /usr/src/app/backend

RUN npm install && npm run build

ARG NODE_PATH
ENV NODE_PATH=build/

EXPOSE 8080

CMD ["node", "--max-http-header-size=32000", "build/app.js"]
