# install
FROM node:8.16-alpine AS installer

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --quiet

# build
FROM installer AS builder

WORKDIR /usr/src/app

COPY tsconfig.json .
COPY ./src src
RUN npm run build

# run
FROM node:8.16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --quiet

COPY --from=builder /usr/src/app/dist dist
COPY ./src/api dist/api
COPY ./config config

RUN npm install --quiet

# EXPOSE 8080

CMD [ "node", "dist/app.js" ]
# CMD ["npm", "start"]
