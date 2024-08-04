FROM node:20
RUN apt-get update
RUN npm install -g typescript
WORKDIR /app
COPY . ./workflow-engine