#!/bin/bash
set -e

# Run build
npm install
npm run build

# Copy build folder to deploy path
mkdir -p "$DEPLOY_PATH/$TARGET_FOLDER"
cp -r "./build" "$DEPLOY_PATH/$TARGET_FOLDER"
cp -r "./public/." "$DEPLOY_PATH/$TARGET_FOLDER"
# Produce an ES module for appProps so the preview can import it.
# Prefer `secretProps.json` if present (created earlier in the workflow),
# otherwise fall back to the template.
props_file="secretProps.json"
if [ ! -f "$props_file" ]; then
	props_file="secretProps.template.json"
fi
mkdir -p "$DEPLOY_PATH/$TARGET_FOLDER/build"
printf 'export default ' > "$DEPLOY_PATH/$TARGET_FOLDER/build/appProps.js"
cat "$props_file" >> "$DEPLOY_PATH/$TARGET_FOLDER/build/appProps.js"
printf ';
' >> "$DEPLOY_PATH/$TARGET_FOLDER/build/appProps.js"
