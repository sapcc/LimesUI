import {
  __commonJS,
  __toESM,
  require_react,
  require_react_dom
} from "./chunk-E4BFALZD.js";

// node_modules/react-dom/client.js
var require_client = __commonJS({
  "node_modules/react-dom/client.js"(exports) {
    "use strict";
    var m = require_react_dom();
    if (false) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  }
});

// src/index.js
var import_client = __toESM(require_client());
var import_react = __toESM(require_react());
var mount = (container, options = {}) => {
  import("./App-TP7WGUZM.js").then((App) => {
    mount.root = (0, import_client.createRoot)(container);
    mount.root.render(import_react.default.createElement(App.default, options?.props));
  });
};
var unmount = () => mount.root && mount.root.unmount();
export {
  mount,
  unmount
};
//# sourceMappingURL=index.js.map
