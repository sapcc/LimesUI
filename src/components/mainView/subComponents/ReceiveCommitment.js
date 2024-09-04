import React from "react";
import { Button, Icon } from "juno-ui-components";
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
      onClick={() => {
        onTransfer();
      }}
    >
      <Icon className="mr-2" icon="download" title="Receive" size="18" />
      <span>Receive Commitment</span>
    </Button>
  );
};

export default ReceiveCommitment;
