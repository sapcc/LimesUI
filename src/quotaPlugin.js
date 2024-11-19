/**
 * Copyright 2024 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
