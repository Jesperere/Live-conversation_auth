FROM node:lts

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

EXPOSE 4000

COPY . .

CMD ["npm", "start"]

