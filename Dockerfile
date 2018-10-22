# base image
FROM node:10-alpine 

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn

# start app
CMD ["yarn", "start"]