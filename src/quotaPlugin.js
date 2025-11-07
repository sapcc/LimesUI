// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { createRoot } from "react-dom/client";
import React from "react";

// export mount and unmount functions
export const mount = (container, options = {}) => {
  import("./quota/Usage").then((App) => {
    mount.root = createRoot(container);
    mount.root.render(React.createElement(App.default, options?.props));
  });
};

export const unmount = () => mount.root && mount.root.unmount();
