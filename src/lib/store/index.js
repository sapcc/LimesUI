import { createStore } from "zustand";
import { devtools } from "zustand/middleware";
import apiStore from "./apiStore";
import limesStore from "./limesStore";
import createCommitmentStore from "./createCommitmentStore";

export default () =>
  createStore(
    devtools((set, get) => ({
      ...apiStore(set, get),
      ...limesStore(set, get),
      ...createCommitmentStore(set, get),
    }))
  );
