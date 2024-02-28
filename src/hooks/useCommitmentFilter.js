import { projectStore } from "../components/StoreProvider";

const useCommitmentFilter = () => {
  const { commitments } = projectStore();

  function filterCommitments(resourceName, azName) {
    return commitments.filter((commitment) => {
      return (
        commitment.resource_name === resourceName &&
        commitment.availability_zone === azName
      );
    });
  }

  function isPlanned(commitment) {
    let planned = false;
    if (commitment.confirm_by > Math.floor(Date.now() / 1000)) {
      planned = true;
    }
    return planned;
  }

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
    isPending,
    isPlanned,
  };
};

export default useCommitmentFilter;
