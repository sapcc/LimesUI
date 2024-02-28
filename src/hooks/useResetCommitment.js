import { createCommitmentStoreActions } from "../components/StoreProvider";
import { initialCommitmentObject } from "../lib/constants";

const useResetCommitment = () => {
  const { setCurrentAZ } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setCommitment } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const { setTransferCommitment } = createCommitmentStoreActions();
  const { setIsTransferring } = createCommitmentStoreActions();

  function resetCommitment(az) {
    setCurrentAZ(az[0]);
    setIsCommitting(false);
    setCommitment(initialCommitmentObject);
    setToast(null);
  }

  function resetCommitmentTransfer() {
    setCommitment(initialCommitmentObject);
    setTransferCommitment(false);
    setIsTransferring(false);
  }

  return { resetCommitment, resetCommitmentTransfer };
};

export default useResetCommitment;
