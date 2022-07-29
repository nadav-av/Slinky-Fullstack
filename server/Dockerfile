From node:16.14.0

WORKDIR /usr/code

COPY package*.json ./

RUN npm install


COPY . .

ENV NODE_ENV=production

EXPOSE 3042

CMD ["npm", "start"]

