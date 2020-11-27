FROM node:12-alpine
WORKDIR /verifycode-be

COPY . .
RUN yarn install
RUN yarn build
CMD yarn serve
