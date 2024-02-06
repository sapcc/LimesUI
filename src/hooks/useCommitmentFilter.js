import { limesStore } from "../components/StoreProvider";

const useCommitmentFilter = () => {
  const { commitments } = limesStore();

  function filterCommitments(resourceName, azName) {
    return commitments.filter((commitment) => {
      return (
        commitment.resource_name === resourceName &&
        commitment.availability_zone === azName
      );
    });
  }

  function hasPlannedCommitments(resourceName, azName) {
    const filteredCommitments = filterCommitments(resourceName, azName);
    let planned = false;
    for (const commitment of filteredCommitments) {
      if (commitment.confirm_by > Math.floor(Date.now() / 1000)) {
        planned = true;
        break;
      }
    }

    return planned;
  }

  function hasPendingCommitments(resourceName, azName) {
    const filteredCommitments = filterCommitments(resourceName, azName);
    let pending = false;
    for (const commitment of filteredCommitments) {
      if (
        commitment.confirm_by < Math.floor(Date.now() / 1000) &&
        !("confirmed_at" in commitment)
      ) {
        pending = true;
        break;
      }
    }
    return pending;
  }
  return { filterCommitments, hasPendingCommitments, hasPlannedCommitments };
};

export default useCommitmentFilter;
