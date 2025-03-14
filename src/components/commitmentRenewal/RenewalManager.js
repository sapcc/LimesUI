/**
 * Copyright 2025 SAP SE
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

import React from "react";
import CommitmentRenewal from "./CommitmentRenewal";
import moment from "moment";
import { projectStore } from "../StoreProvider";
import useCommitmentFilter from "../../hooks/useCommitmentFilter";

// RenewalManager fetches renwable commitments for the current scope.
// Currently only available at project level.
const RenewalManager = () => {
  const { commitments } = projectStore();
  const { isActive, getCommitmentLabel } = useCommitmentFilter();
  const now = moment().utc().unix();
  const [renewableCommitments, inconsistentCommitments] = React.useMemo(() => {
    let renewableCommitments = commitments.filter(
      (c) =>
        !c.was_extended &&
        moment(now).isAfter(moment(c.expires_at).subtract(3, "months")) &&
        moment(now).isBefore(moment(c.expires_at))
    );

    let inconsistentCommitments = [];
    renewableCommitments.forEach((c) => {
      if (c.transfer_status) {
        c.reason = "in transfer";
        inconsistentCommitments.push(c);
        return;
      }
      if (!isActive(c)) {
        c.reason = getCommitmentLabel(c);
        inconsistentCommitments.push(c);
        return;
      }
    });
    inconsistentCommitments.forEach((c) => {
      const index = renewableCommitments.indexOf(c);
      renewableCommitments.splice(index, 1);
    });
    renewableCommitments = renewableCommitments.sort(compareCommitmentsByCategory);
    inconsistentCommitments = inconsistentCommitments.sort(compareCommitmentsByCategory);
    return [renewableCommitments, inconsistentCommitments];
  }, [commitments]);

  function compareCommitmentsByCategory(a, b) {
    if (a.service_type < b.service_type) {
      return -1;
    }
    if (a.service_type > b.service_type) {
      return 1;
    }
    if (a.expires_at < b.expires_at) {
      return -1;
    }
    if (a.expires_at > b.expires_at) {
      return 1;
    }
    return 0;
  }

  return <CommitmentRenewal renewable={renewableCommitments} inconsistent={inconsistentCommitments} />;
};

export default RenewalManager;
