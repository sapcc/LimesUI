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

// Project and Commitment Store
export const limesStore = () => useAppStore((state) => state.project);
export const limesStoreActions = () =>
  useAppStore((state) => state.project.actions);

// Creating commitments
export const createCommitmentStore = () =>
  useAppStore((state) => state.createCommitment);
export const createCommitmentStoreActions = () =>
  useAppStore((state) => state.createCommitment.actions);

export default StoreProvider;
