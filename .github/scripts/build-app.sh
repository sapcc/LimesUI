#!/bin/bash
set -e

# Run build
npm install
npm run build

# Copy build folder to deploy path
mkdir -p "$DEPLOY_PATH/$TARGET_FOLDER"
cp -r "./build" "$DEPLOY_PATH/$TARGET_FOLDER"
cp -r "./public" "$DEPLOY_PATH/$TARGET_FOLDER"
cp secretProps.template.json "$DEPLOY_PATH/$TARGET_FOLDER/build/appProps.json"
