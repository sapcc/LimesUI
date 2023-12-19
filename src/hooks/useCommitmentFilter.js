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

  function hasPendingCommitments(resourceName, azName) {
    const filteredCommitments = filterCommitments(resourceName, azName);
    let pending = false;
    filteredCommitments.forEach((commitment) => {
      if (!("confirmed_at" in commitment)) {
        pending = true;
      }
    });
    return pending;
  }
  return { filterCommitments, hasPendingCommitments };
};

export default useCommitmentFilter;
