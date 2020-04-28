FROM node:10-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY ./.next ./.next
COPY ./public ./public
EXPOSE 80
CMD npm start