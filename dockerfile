FROM node:20-alpine

RUN apk add --no-cache bash

WORKDIR /home_housing
COPY package*.json .
RUN npm install
COPY . /home_housing/

