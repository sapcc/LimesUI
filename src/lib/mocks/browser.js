import { setupWorker } from "msw/browser";
import handlers from "./handlers";

let worker = null;

export const startWorker = (options) => {
  worker = setupWorker(...handlers(options));
  return worker.start();
};
