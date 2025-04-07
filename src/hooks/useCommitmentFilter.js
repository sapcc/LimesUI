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
    return isConfirmed;
  }

  return { getCommitmentLabel, filterCommitments, isPending, isPlanned, isActive };
};

export default useCommitmentFilter;
