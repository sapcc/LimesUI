// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { setupWorker } from "msw/browser";
import handlers from "./handlers";

let worker = null;

export const startWorker = async (options) => {
  worker = setupWorker(...handlers(options));

  // Register MSW using a relative URL so the service worker is requested
  // under the current page path (works for local dev and GitHub Pages previews).
  const relativeUrl = "mockServiceWorker.js";
  const resolvedURL = new URL(relativeUrl, window.location.href).toString();
  return worker.start({ serviceWorker: { url: resolvedURL } });
};
