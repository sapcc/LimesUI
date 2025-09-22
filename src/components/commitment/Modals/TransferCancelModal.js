import React from "react";
import { Modal } from "@cloudoperators/juno-ui-components";
import { TransferType } from "../../../lib/constants";

const TransferCancelModal = (props) => {
  const { commitment, title, startCommitmentTransfer, onModalClose } = props;

  return (
    <Modal
      title={title}
      open={true}
      confirmButtonLabel="Confirm"
      onConfirm={() => {
        startCommitmentTransfer(null, commitment, TransferType.NONE);
      }}
      cancelButtonLabel="Cancel"
      onCancel={() => {
        onModalClose();
      }}
    >
      <div className={"mb-4 font-medium"}>
        <div>Do you want to reset the commitment transfer state?</div>
      </div>
    </Modal>
  );
};

export default TransferCancelModal;
