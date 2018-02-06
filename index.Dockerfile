FROM node:latest

RUN mkdir opt/app

WORKDIR /opt/app

ADD ./src /opt/app/src
ADD ./specs /opt/app/specs
ADD ./package.json /opt/app
ADD ./index.js /opt/app

EXPOSE 2000 3000

CMD ["npm", "start"]