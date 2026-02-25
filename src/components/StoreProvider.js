// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React, { createContext, useContext } from "react";
import { useStore as create } from "zustand";
import createStore from "../lib/store";

const StoreContext = createContext();
const StoreProvider = ({ children }) => <StoreContext.Provider value={createStore()}>{children}</StoreContext.Provider>;

const useAppStore = (selector) => create(useContext(StoreContext), selector);

// APIStore
export const apiStore = () => useAppStore((state) => state.api.globalAPI);
export const apiStoreActions = () => useAppStore((state) => state.api.actions);

// limes globals
export const globalStore = () => useAppStore((state) => state.global);
export const globalStoreActions = () => useAppStore((state) => state.global.actions);

// Cluster Store
export const clusterStore = () => useAppStore((state) => state.cluster);
export const clusterStoreActions = () => useAppStore((state) => state.cluster.actions);

// Cluster Store - Specific selectors
export const useClusterData = () => useAppStore((state) => state.cluster.clusterData);
export const useRefetchClusterAPI = () => useAppStore((state) => state.cluster.refetchClusterAPI);
export const useClusterDomainData = () => useAppStore((state) => state.cluster.domainData);

// Domain Store
export const domainStore = () => useAppStore((state) => state.domain);
export const domainStoreActions = () => useAppStore((state) => state.domain.actions);

// Domain Store - Specific selectors
export const useDomainData = () => useAppStore((state) => state.domain.domainData);
export const useRefetchDomainAPI = () => useAppStore((state) => state.domain.refetchDomainAPI);
export const useDomainProjects = () => useAppStore((state) => state.domain.projects);

// Project and Commitment Store
export const projectStore = () => useAppStore((state) => state.project);
export const projectStoreActions = () => useAppStore((state) => state.project.actions);

// Project Store - Specific selectors
export const useProjectData = () => useAppStore((state) => state.project.projectData);
export const useRefetchProjectAPI = () => useAppStore((state) => state.project.refetchProjectAPI);
export const useCommitments = () => useAppStore((state) => state.project.commitments);

// Creating commitments
export const createCommitmentStore = () => useAppStore((state) => state.createCommitment);
export const createCommitmentStoreActions = () => useAppStore((state) => state.createCommitment.actions);

// Commitment Store - Specific selectors
export const useCommitment = () => useAppStore((state) => state.createCommitment.commitment);
export const useTransferredCommitment = () => useAppStore((state) => state.createCommitment.transferredCommitment);
export const useRefetchCommitmentAPI = () => useAppStore((state) => state.createCommitment.refetchCommitmentAPI);
export const useIsCommitting = () => useAppStore((state) => state.createCommitment.isCommitting);
export const useIsEditing = () => useAppStore((state) => state.createCommitment.isEditing);
export const useIsSubmitting = () => useAppStore((state) => state.createCommitment.isSubmitting);
export const useCommitmentIsLoading = () => useAppStore((state) => state.createCommitment.commitmentIsLoading);
export const useCommitmentIsFetching = () => useAppStore((state) => state.createCommitment.commitmentIsFetching);
export const useToast = () => useAppStore((state) => state.createCommitment.toast);
export const useCurrentAZ = () => useAppStore((state) => state.createCommitment.currentAZ);
export const useCurrentProject = () => useAppStore((state) => state.createCommitment.currentProject);
export const useTransferCommitment = () => useAppStore((state) => state.createCommitment.transferCommitment);
export const useIsTransferring = () => useAppStore((state) => state.createCommitment.isTransferring);
export const useTransferProject = () => useAppStore((state) => state.createCommitment.transferProject);
export const useTransferFromAndToProject = () =>
  useAppStore((state) => state.createCommitment.transferFromAndToProject);
export const useConversionCommitment = () => useAppStore((state) => state.createCommitment.conversionCommitment);
export const useShowConversionOption = () => useAppStore((state) => state.createCommitment.showConversionOption);
export const useDeleteCommitment = () => useAppStore((state) => state.createCommitment.deleteCommitment);
export const useUpdateDurationCommitment = () =>
  useAppStore((state) => state.createCommitment.updateDurationCommitment);
export const useValidDurations = () => useAppStore((state) => state.createCommitment.validDurations);

export default StoreProvider;
