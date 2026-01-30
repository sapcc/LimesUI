#!/bin/bash
set -e

# Run build
npm install
npm run build

# Define appProps for each UI view
mkdir -p ./public/config
base_config='{
  "theme": "theme-light",
  "token": "token",
  "canEdit": true,
  "mockAPI": true
}'
cluster_config="$(echo "$base_config" | jq .)"
echo "$cluster_config" > ./public/config/cluster-appProps.json
domain_config="$(echo "$cluster_config" | jq '.domainID = "456"')"
echo "$domain_config" > ./public/config/domain-appProps.json
project_config="$(echo "$domain_config" | jq '.projectID = "123"')"
echo "$project_config" > ./public/config/project-appProps.json

# Copy build folder to deploy path
mkdir -p "$DEPLOY_PATH/$TARGET_FOLDER"
cp "./appProps.template.json" "./build/appProps.json"
cp -r "./build" "$DEPLOY_PATH/$TARGET_FOLDER"
cp -r "./public/." "$DEPLOY_PATH/$TARGET_FOLDER"
