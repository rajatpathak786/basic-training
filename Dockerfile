FROM node:alpine

LABEL maintainer Ashwin Yardi <ayardi@techracers.io>

RUN mkdir -p /opt

# install dependecies
RUN apk update
RUN apk add --no-cache git build-base gcc abuild make bash python

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 80 for node, and 9229 and 9230 (tests) for debug
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229 9230


# install latest npm, reguardless of node version, for speed and fixes
RUN npm i npm@latest -g

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt

COPY package*.json yarn*.lock ./
RUN yarn install
ENV PATH /opt/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
COPY . /opt

CMD make dev_server
