#!/bin/sh

find ./src/assets/freeport/ -name "*.webp" -exec bash -c 'file="{}"; squoosh-cli --webp auto "$file"' \;
# find ./src/assets/ -name "*.png" -exec bash -c 'file="{}"; squoosh-cli --webp auto "$file"' \;
