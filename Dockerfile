FROM node:16

WORKDIR /app

ENV ADDR=0.0.0.0

COPY yarn.lock package.json tsconfig.json ./

RUN yarn install

ADD src ./src

CMD ["yarn","start","--deploy"]

