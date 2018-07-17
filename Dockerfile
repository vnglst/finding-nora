FROM mhart/alpine-node:10
WORKDIR /usr/src
COPY yarn.lock package.json ./
RUN yarn
COPY . .
RUN yarn build && mv build /public