// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// workaround until https://github.com/jsdom/jsdom/issues/2524 is fixed
// see https://github.com/remix-run/react-router/issues/12363#issuecomment-2496226528
if (!globalThis.TextEncoder || !globalThis.TextDecoder) {
  const { TextDecoder, TextEncoder } = require("node:util");
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder;
}

// Beginning with Juno v4, testcases require an ResizeOberver to be present
class ResizeObserver {
  observe() {
    () => {};
  }
  unobserve() {
    () => {};
  }
  disconnect() {
    () => {};
  }
}

window.ResizeObserver = ResizeObserver;
