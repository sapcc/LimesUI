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
      if (isPlanned(commitment)) {
        planned = true;
        break;
      }
    }
    return planned;
  }

  function isPlanned(commitment) {
    let planned = false;
    if (commitment.confirm_by > Math.floor(Date.now() / 1000)) {
      planned = true;
    }
    return planned;
  }

  // Resource level
  function hasPendingCommitments(resourceName, azName) {
    const filteredCommitments = filterCommitments(resourceName, azName);
    let pending = false;
    for (const commitment of filteredCommitments) {
      if (isPending(commitment)) {
        pending = true;
        break;
      }
    }
    return pending;
  }

  // Commitment level
  function isPending(commitment) {
    let pending = false;
    if (
      commitment.confirm_by < Math.floor(Date.now() / 1000) &&
      !("confirmed_at" in commitment)
    ) {
      pending = true;
    }
    return pending;
  }

  return {
    filterCommitments,
    hasPendingCommitments,
    isPending,
    hasPlannedCommitments,
    isPlanned,
  };
};

export default useCommitmentFilter;
