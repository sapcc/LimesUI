#!/bin/bash
set -e

# collect the necessary information
entry_file=$(jq -r '.module // .main // .exports["."]' ./package.json)
build_folder=$(dirname $entry_file)

# Run build using turbo
npm install
npm run build

# Copy build folder to deploy path
mkdir -p "$DEPLOY_PATH/$TARGET_FOLDER"
cp -r "./$build_folder/." "$DEPLOY_PATH/$TARGET_FOLDER"
