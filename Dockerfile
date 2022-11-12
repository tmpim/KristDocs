FROM node:16.17-alpine3.15
WORKDIR /build
COPY ["package.json", "yarn.lock", "./"]
RUN yarn global add vuepress@^1.5.3 vue@^2.7.10 vue-template-compiler@^2.7.10
RUN yarn install
ENV NODE_ENV=production
COPY . .

CMD yarn build
