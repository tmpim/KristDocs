FROM node:16.17-alpine3.15
ENV NODE_ENV=production
WORKDIR /build
COPY ["package.json", "yarn.lock", "./"]
RUN yarn global add vuepress@^1.5.3 vue@^2.7.10 vue-template-compiler@^2.7.10 patch-package@^6.4.7
RUN yarn install
COPY . .

CMD yarn build
