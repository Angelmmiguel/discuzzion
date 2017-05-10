FROM bitnami/node:7
MAINTAINER Angel M <angel@laux.es>

# Required for Yarn
RUN sudo apt-get update && sudo apt-get install -y apt-transport-https vim

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && \
    sudo apt-get update && sudo apt-get install -y yarn

# Cache dependencies
COPY package.json yarn.lock /app/
RUN yarn install

# Clean
RUN apt-get remove --purge -y apt-transport-https && apt-get clean && apt-get purge && \
    rm -rf /var/lib/apt/lists/*

CMD ['yarn', 'start']
