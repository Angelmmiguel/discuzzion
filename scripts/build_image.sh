#!/bin/bash -e

# Build the current image
echo "Building the image..."
HASH=$(git log --pretty=format:'%h' -n 1)
docker build -t angelrb/discuzzion:$HASH .

if [ $? -eq 0 ]; then
  echo "Pushing the image..."
  docker tag angelrb/discuzzion:$HASH angelrb/discuzzion:latest
  docker push angelrb/discuzzion:$HASH
  docker push angelrb/discuzzion:latest
else
  echo "Error building the image. Please review it"
fi
