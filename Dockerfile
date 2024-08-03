FROM node:20
RUN apt-get update
WORKDIR /app
COPY . .