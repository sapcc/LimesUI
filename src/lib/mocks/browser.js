// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { setupWorker } from "msw/browser";
import handlers from "./handlers";

let worker = null;

export const startWorker = (options) => {
  worker = setupWorker(...handlers(options));
  return worker.start();
};
