FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn  build

EXPOSE 5000

CMD ["npm", "start"]