// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import { projectStore } from "../components/StoreProvider";

const useCommitmentFilter = () => {
  const { commitments } = projectStore();

  function filterCommitments(resourceName, azName) {
    return commitments.filter((commitment) => {
      return commitment.resource_name === resourceName && commitment.availability_zone === azName;
    });
  }

  function getCommitmentLabel(commitment) {
    if (isActive(commitment)) {
      return "Committed";
    }
    if (isPending(commitment)) {
      return "Pending";
    }
    if (isPlanned(commitment)) {
      return "Planned";
    }
    return "";
  }

  function isPending(commitment) {
    return commitment.confirm_by < Math.floor(Date.now() / 1000) && !("confirmed_at" in commitment);
  }

  function isPlanned(commitment) {
    return commitment.confirm_by > Math.floor(Date.now() / 1000);
  }

  function isActive(commitment) {
    const { confirmed_at: isConfirmed = false } = commitment;
    return isConfirmed !== false;
  }

  return { getCommitmentLabel, filterCommitments, isPending, isPlanned, isActive };
};

export default useCommitmentFilter;
