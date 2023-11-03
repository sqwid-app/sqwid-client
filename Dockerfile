FROM node:18
RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y node-gyp
RUN mkdir /usr/app
WORKDIR /usr/app
COPY package.json yarn.lock./
RUN yarn install
COPY . ./
EXPOSE 3000
CMD [ "yarn", "start" ]