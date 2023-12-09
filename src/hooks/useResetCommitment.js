import { createCommitmentStoreActions } from "../components/StoreProvider";
import { initialCommitmentObject } from "../lib/constants";

const useResetCommitment = () => {
  const { setCurrentAZ } = createCommitmentStoreActions();
  const { setIsCommitting } = createCommitmentStoreActions();
  const { setCommitment } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();

  function resetCommitment(az) {
    setCurrentAZ(az[0]);
    setIsCommitting(false);
    setCommitment(initialCommitmentObject);
    setToast(null);
  }

  return resetCommitment;
};

export default useResetCommitment;
