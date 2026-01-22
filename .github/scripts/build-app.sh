#!/bin/bash
set -e

# Run build
npm install
npm run build

# Define appProps for each UI view
mkdir -p ./public/config
project_config='{
  "theme": "theme-light",
  "projectID": "123",
  "domainID": "456",
  "token": "token",
  "canEdit": true,
  "mockAPI": true
}'

domain_config='{
  "theme": "theme-light",
  "domainID": "456",
  "token": "token",
  "canEdit": true,
  "mockAPI": true
}'

cluster_config='{
  "theme": "theme-light",
  "token": "token",
  "canEdit": true,
  "mockAPI": true
}'
echo "$project_config" | jq '.' > ./public/config/project-appProps.json
echo "$domain_config" | jq '.' > ./public/config/domain-appProps.json
echo "$cluster_config" | jq '.' > ./public/config/cluster-appProps.json

# Copy build folder to deploy path
mkdir -p "$DEPLOY_PATH/$TARGET_FOLDER"
cp "./appProps.template.json" "./build/appProps.json"
cp -r "./build" "$DEPLOY_PATH/$TARGET_FOLDER"
cp -r "./public/." "$DEPLOY_PATH/$TARGET_FOLDER"
