import React from "react";
import { Button } from "@cloudoperators/juno-ui-components";
import { initialCommitmentObject } from "../../lib/constants";
import {
  globalStore,
  createCommitmentStore,
  createCommitmentStoreActions,
} from "../StoreProvider";

const AddCommitments = (props) => {
  const { label, size, disabled } = props;
  const { scope } = globalStore();
  const { setCommitment } = createCommitmentStoreActions();
  const { isCommitting } = createCommitmentStore();
  const { setIsCommitting } = createCommitmentStoreActions();
  const active = disabled || isCommitting;

  return (
    <Button
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
  );
};

export default AddCommitments;
