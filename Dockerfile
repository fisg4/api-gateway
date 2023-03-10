FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY bin ./bin
COPY routes ./routes
COPY app.js .
COPY passport.js .

EXPOSE 3000

CMD npm start