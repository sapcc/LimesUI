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

import { createCommitmentStoreActions } from "../components/StoreProvider";
import { initialCommitmentObject } from "../lib/constants";

const useResetCommitment = () => {
  const { setCurrentAZ } = createCommitmentStoreActions();
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
  function resetCommitment(az) {
    setCurrentAZ(az[0]);
    resetURLChangeState();
  }

  // Handle manual URL change.
  function resetURLChangeState() {
    setIsCommitting(false);
    setCommitment(initialCommitmentObject);
    setTransferredCommitment(initialCommitmentObject);
    setDeleteCommitment(null);
    setConversionCommitment(null);
    setUpdateDurationCommitment(null);
    setToast(null);
    resetCommitmentTransfer();
  }

  // Handle commitment transfer mode cancellation.
  function resetCommitmentTransfer() {
    setCommitment(initialCommitmentObject);
    setTransferCommitment(false);
    setIsTransferring(false);
    setTransferFromAndToProject(null);
  }

  return { resetCommitment, resetURLChangeState, resetCommitmentTransfer };
};

export default useResetCommitment;
