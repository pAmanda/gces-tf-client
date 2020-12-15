FROM node:12.18.4-alpine3.12
WORKDIR /client
COPY . /client
RUN yarn install
EXPOSE 8080
CMD ["yarn", "serve"]