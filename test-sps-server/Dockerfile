# Dockerfile
FROM node:14
#o node:14-slim

WORKDIR /app

COPY package*.json ./
RUN apt-get update && apt-get install -y build-essential python3

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y curl && \
    curl -sSL https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh -o /wait-for-it.sh && \
    chmod +x /wait-for-it.sh


EXPOSE 3001
#CMD ["node", "src/index.js"]
CMD ["/wait-for-it.sh", "db:3306", "--", "npm", "start"]

