FROM node:8

# Global install yarn package manager
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

WORKDIR /workspace

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:8

WORKDIR /workspace

COPY --from=0 /workspace/build .

CMD ["node", "./bundle.js"]
