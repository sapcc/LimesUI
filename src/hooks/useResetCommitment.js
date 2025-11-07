// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { createCommitmentStoreActions } from "../components/StoreProvider";
import { initialCommitmentObject } from "../lib/constants";

const useResetCommitment = () => {
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setCommitment } = createCommitmentStoreActions();
  const { setTransferredCommitment } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const { setTransferCommitment } = createCommitmentStoreActions();
  const { setIsTransferring } = createCommitmentStoreActions();
  const { setTransferFromAndToProject } = createCommitmentStoreActions();
  const { setDeleteCommitment } = createCommitmentStoreActions();
  const { setConversionCommitment } = createCommitmentStoreActions();
  const { setUpdateDurationCommitment } = createCommitmentStoreActions();

  // Handle closure of edit panel.
  function resetCommitment() {
    resetURLChangeState();
  }

  // Handle manual URL change.
  function resetURLChangeState() {
    setIsCommitting(false);
    setCommitment(initialCommitmentObject);
    setDeleteCommitment(null);
    setConversionCommitment(null);
    setUpdateDurationCommitment(null);
    setToast(null);
    resetCommitmentTransfer();
  }

  // Handle commitment transfer mode cancellation.
  function resetCommitmentTransfer() {
    setCommitment(initialCommitmentObject);
    setTransferredCommitment(initialCommitmentObject);
    setTransferCommitment(false);
    setIsTransferring(false);
    setTransferFromAndToProject(null);
  }

  return { resetCommitment, resetURLChangeState, resetCommitmentTransfer };
};

export default useResetCommitment;
