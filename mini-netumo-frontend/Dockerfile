FROM node:18-alpine

WORKDIR /client

COPY package.json .

# Increase timeout just in case
RUN npm install --timeout=60000

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
