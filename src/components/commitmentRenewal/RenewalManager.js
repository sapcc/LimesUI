// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import CommitmentRenewal from "./CommitmentRenewal";
import moment from "moment";
import { parseCommitmentDuration } from "../../lib/parseCommitmentDurations";
import { projectStore } from "../StoreProvider";
import useCommitmentFilter from "../../hooks/useCommitmentFilter";
import { ErrorBoundary } from "../../lib/ErrorBoundary";

// RenewalManager fetches renwable commitments for the current scope.
// Currently only available at project level.
const RenewalManager = (props) => {
  const { canEdit = false } = props;
  const { commitments } = projectStore();
  const { isActive, getCommitmentLabel } = useCommitmentFilter();
  const now = moment().utc();
  const [renewableCommitments, inconsistentCommitments] = React.useMemo(() => {
    if (!commitments) return [[], []];
    let renewableCommitments = commitments.filter(
      (c) =>
        !c.was_renewed &&
        parseCommitmentDuration(c.duration) >= parseCommitmentDuration("1 year") &&
        now.isAfter(moment.unix(c.expires_at).subtract(3, "months")) &&
        now.isBefore(moment.unix(c.expires_at))
    );

    let inconsistentCommitments = [];
    renewableCommitments.forEach((c) => {
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
    return [renewableCommitments, inconsistentCommitments];
  }, [commitments]);

  return (
    <ErrorBoundary>
      <CommitmentRenewal canEdit={canEdit} renewable={renewableCommitments} inconsistent={inconsistentCommitments} />
    </ErrorBoundary>
  );
};

export default RenewalManager;
