From node:16.14.0

WORKDIR /usr/code

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /usr/code/server/storages

ENV NODE_ENV=production

RUN npm i sequelize-cli
RUN npx sequelize-cli db:migrate


EXPOSE 3001

CMD ["npm", "start"]

