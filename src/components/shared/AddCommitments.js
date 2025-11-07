// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Button } from "@cloudoperators/juno-ui-components";
import { initialCommitmentObject } from "../../lib/constants";
import { globalStore, createCommitmentStore, createCommitmentStoreActions } from "../StoreProvider";
import { getResourceDurations } from "../../lib/utils";

const AddCommitments = (props) => {
  const { label, size, disabled, resource } = props;
  const { scope } = globalStore();
  const { setCommitment } = createCommitmentStoreActions();
  const { isCommitting } = createCommitmentStore();
  const { setIsCommitting } = createCommitmentStoreActions();
  const active = disabled || isCommitting;
  const hasResourceDurations = getResourceDurations(resource).length > 0;

  return (
    hasResourceDurations && (
      <Button
        data-testid="addCommitment"
        data-cy="addCommitment"
        onClick={() => {
          // On Cluster/Domain View a project can be transferred, therefore we reset it first
          // Otherwise there will be key conflicts with the Commitment Table.
          if (scope.isCluster() || scope.isDomain()) {
            setCommitment({ ...initialCommitmentObject });
          }
          setIsCommitting(true);
        }}
        variant="primary"
        disabled={active}
        icon={scope.isProject() ? "addCircle" : undefined}
        size={size}
      >
        {label}
      </Button>
    )
  );
};

export default AddCommitments;
