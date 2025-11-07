// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

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
