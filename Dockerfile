# FROM node:20
# WORKDIR /app
# #why package.json first ?
# COPY package.json .
# RUN npm install
# COPY . ./
# ENV PORT=8002
# EXPOSE $PORT
# CMD ["npm","run","dev"]

# Base Image
FROM node:20

# Use build arguments to specify the service
ARG SERVICE_DIR

# RUN echo $NEWCMD

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
# COPY . ./
COPY ./Common /app/Common
COPY .env /app
COPY ./${SERVICE_DIR} /app/${SERVICE_DIR}
# COPY . ./${SERVICE_DIR}
# COPY ${SERVICE_DIR}/ .

# Expose port and start application
EXPOSE 4000

# CMD ["node", "server.js"]
# CMD ["npm","run","prod"]
CMD [ "node","./Common/server.js","${SERVICE_DIR}" ]