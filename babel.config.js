// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

// Transform import.meta.hot (vite-specific) to undefined for react-router 8.x compatibility
const transformImportMetaHot = () => ({
  visitor: {
    MetaProperty(path) {
      if (path.node.meta.name === "import" && path.node.property.name === "meta") {
        const { parent } = path;
        if (parent.type === "MemberExpression" && parent.property.name === "hot") {
          path.parentPath.replaceWithSourceString("undefined");
        }
      }
    },
  },
});

module.exports = {
  env: {
    test: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [transformImportMetaHot, ["babel-plugin-transform-import-meta", { module: "ES6" }]],
    },
  },
};
