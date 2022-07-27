From node:16.14.0

WORKDIR /usr/code

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /usr/code/server/storages

RUN 

EXPOSE 3001

CMD ["npm", "start"]

