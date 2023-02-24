#!/bin/sh

find . -name "*.jpg" -exec bash -c 'file="{}"; squoosh-cli --webp auto "$file"' \;
find . -name "*.png" -exec bash -c 'file="{}"; squoosh-cli --webp auto "$file"' \;
