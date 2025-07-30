FROM node:20 as builder
RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y node-gyp

WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn install
COPY . ./

RUN yarn build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/app/build /usr/share/nginx/html

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]
