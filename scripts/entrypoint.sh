#!/bin/bash

export PATH="/app/node_modules/.bin:$PATH"

echo "Node Version:  $(node -v)"

# Install yarn
if ! which yarn >/dev/null; then
  echo "Yarn is not detected. Installing..."
  sudo apt-get update && sudo apt-get install -y apt-transport-https
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt-get update && sudo apt-get install -y yarn
fi

# Install modules
echo "Installing missing dependencies..."
yarn install --mutex file

exec "$@"