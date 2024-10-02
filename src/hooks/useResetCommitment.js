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
