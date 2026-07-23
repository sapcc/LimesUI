// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Button } from "@cloudoperators/juno-ui-components";
import { initialCommitmentObject } from "../../lib/constants";
import { useGlobalStore, createCommitmentStoreActions, useCreateCommitmentStore } from "../StoreProvider";
import { getResourceDurations } from "../../lib/utils";

const AddCommitments = (props) => {
  const { label, size, disabled, resource, onClick } = props;
  const scope = useGlobalStore((state) => state.scope);
  const canEdit = useGlobalStore((state) => state.canEdit);
  const { setCommitment } = createCommitmentStoreActions();
  const isCommitting = useCreateCommitmentStore((state) => state.isCommitting);
  const { setIsCommitting } = createCommitmentStoreActions();
  const hasResourceDurations = getResourceDurations(resource).length > 0;

  return (
    hasResourceDurations && (
      <Button
        data-testid="addCommitment"
        data-cy="addCommitment"
        onClick={() => {
          if (!canEdit) return;
          // Call the passed onClick handler first (e.g., to open the project)
          onClick?.();
          // On Cluster/Domain View a project can be transferred, therefore we reset it first
          // Otherwise there will be key conflicts with the Commitment Table.
          if (scope.isCluster() || scope.isDomain()) {
            setCommitment({ ...initialCommitmentObject });
          }
          setIsCommitting(true);
        }}
        variant="primary"
        disabled={disabled || isCommitting || !canEdit}
        icon={scope.isProject() ? "addCircle" : undefined}
        size={size}
      >
        {label}
      </Button>
    )
  );
};

export default AddCommitments;
