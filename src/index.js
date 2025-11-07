// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { createRoot } from "react-dom/client";
import React from "react";

const enableMocking = async (options) => {
  if (!options.isMockApi) {
    return;
  }
  const { startWorker } = await import("./lib/mocks/browser");
  return startWorker(options);
};

export const mount = async (container, options = {}) => {
  const isMockApi = options?.props?.mockAPI || false;
  const defaultEndpoint = "https://" + window.location.host;
  const endpoint = options?.props?.endpoint || defaultEndpoint;
  await enableMocking({ endpoint, defaultEndpoint, isMockApi });
  const App = await import("./App");
  mount.root = createRoot(container);
  mount.root.render(React.createElement(App.default, { ...options?.props, endpoint }));
};

export const unmount = () => mount.root && mount.root.unmount();
