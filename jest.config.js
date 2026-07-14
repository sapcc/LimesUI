// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

module.exports = {
  transform: { "\\.[jt]sx?$": "babel-jest", "\\.mjs$": "babel-jest" },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "/node_modules/(?!(\\.pnpm/[^/]+/node_modules/)?(react-router|@remix-run|cookie-es|set-cookie-parser|turbo-stream|@cloudoperators|@cj-tech-master)/)",
  ],
  moduleNameMapper: {
    // Jest currently doesn't support resources with query parameters.
    // Therefore we add the optional query parameter matcher at the end
    // https://github.com/facebook/jest/issues/4181
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)(\\?.+)?$":
      require.resolve("./__mocks__/fileMock"),
    "\\.(css|less|scss)$": require.resolve("./__mocks__/styleMock"),
  },
};
