// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React, { createContext, useContext } from "react";
import { useStore as create } from "zustand";
import createStore from "../lib/store";

const StoreContext = createContext();
const StoreProvider = ({ children }) => <StoreContext.Provider value={createStore()}>{children}</StoreContext.Provider>;

const useAppStore = (selector) => create(useContext(StoreContext), selector);

// APIStore
export const useApiStore = (selector = (state) => state) => useAppStore((state) => selector(state.api));
export const apiStoreActions = () => useAppStore((state) => state.api.actions);

// limes globals
export const useGlobalStore = (selector = (state) => state) => useAppStore((state) => selector(state.global));
export const globalStoreActions = () => useAppStore((state) => state.global.actions);

// Cluster Store
export const useClusterStore = (selector = (state) => state) => useAppStore((state) => selector(state.cluster));
export const clusterStoreActions = () => useAppStore((state) => state.cluster.actions);

// Domain Store
export const useDomainStore = (selector = (state) => state) => useAppStore((state) => selector(state.domain));
export const domainStoreActions = () => useAppStore((state) => state.domain.actions);

// Project and Commitment Store
export const useProjectStore = (selector = (state) => state) => useAppStore((state) => selector(state.project));
export const projectStoreActions = () => useAppStore((state) => state.project.actions);

// Creating commitments
export const useCreateCommitmentStore = (selector = (state) => state) =>
  useAppStore((state) => selector(state.createCommitment));
export const createCommitmentStoreActions = () => useAppStore((state) => state.createCommitment.actions);

export default StoreProvider;
