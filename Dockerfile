FROM node:20
WORKDIR /app
#why package.json first ?
COPY package.json .
RUN npm install
COPY . ./
ENV PORT=8002
EXPOSE $PORT
CMD ["npm","run","dev"]
