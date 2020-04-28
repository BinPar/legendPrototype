FROM node:10.13-alpine
WORKDIR /usr/src/app
VOLUME ["/usr/src/app"]
EXPOSE 3000
CMD npm run i;npm run dev