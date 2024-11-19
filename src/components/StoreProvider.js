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

import React, { createContext, useContext } from "react";
import { useStore as create } from "zustand";
import createStore from "../lib/store";

const StoreContext = createContext();
const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={createStore()}>
    {children}
  </StoreContext.Provider>
);

const useAppStore = (selector) => create(useContext(StoreContext), selector);

// APIStore
export const apiStore = () => useAppStore((state) => state.api.globalAPI);
export const apiStoreActions = () => useAppStore((state) => state.api.actions);

// limes globals
export const globalStore = () => useAppStore((state) => state.global);
export const globalStoreActions = () =>
  useAppStore((state) => state.global.actions);

// Cluster Store
export const clusterStore = () => useAppStore((state) => state.cluster);
export const clusterStoreActions = () =>
  useAppStore((state) => state.cluster.actions);

// Domain Store
export const domainStore = () => useAppStore((state) => state.domain);
export const domainStoreActions = () =>
  useAppStore((state) => state.domain.actions);

// Project and Commitment Store
export const projectStore = () => useAppStore((state) => state.project);
export const projectStoreActions = () =>
  useAppStore((state) => state.project.actions);

// Creating commitments
export const createCommitmentStore = () =>
  useAppStore((state) => state.createCommitment);
export const createCommitmentStoreActions = () =>
  useAppStore((state) => state.createCommitment.actions);

export default StoreProvider;
