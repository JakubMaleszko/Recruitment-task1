FROM node:22

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]