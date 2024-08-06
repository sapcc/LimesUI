import React from "react";
import { Button } from "juno-ui-components";
import { createCommitmentStoreActions } from "../../StoreProvider";
import { TransferStatus } from "../../../lib/constants";

const ReceiveCommitment = () => {
  const { setTransferFromAndToProject } = createCommitmentStoreActions();

  function onTransfer() {
    setTransferFromAndToProject(TransferStatus.RECEIVE);
  }

  return (
    <Button
      size="small"
      icon="download"
      label="Receive Commitment"
      onClick={() => {
        onTransfer();
      }}
    />
  );
};

export default ReceiveCommitment;
