# Base Image
FROM node:20

# Use build arguments to specify the service
ARG SERVICE_DIR
ARG SERVICE_PORT

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY ./Common /app/Common
COPY ./${SERVICE_DIR} /app/${SERVICE_DIR}

RUN echo ${SERVICE_PORT}

# Expose port and start application
EXPOSE ${SERVICE_PORT}

ENV VALSRR = ${SERVICE_DIR}

CMD ["node", "./Common/server.js"]
