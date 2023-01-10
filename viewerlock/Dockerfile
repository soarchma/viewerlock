FROM node:16-alpine

WORKDIR /usr/src/viewerlock

COPY *.* /usr/src/viewerlock

RUN npm install

COPY . /usr/src/viewerlock

RUN npm run build

CMD [ "npm" , "run" , "dev"]