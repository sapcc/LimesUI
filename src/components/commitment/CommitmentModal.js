import React from "react";
import { Modal } from "juno-ui-components";
import { Unit, valueWithUnit } from "../../lib/unit";

const CommitmentModal = (props) => {
  const { title, commitment, onConfirm, onModalClose, showModal } = { ...props };
  const unit = new Unit(commitment.unit)

  return (
    <Modal
      title={title}
      confirmButtonLabel="Confirm"
      onConfirm={() => {onConfirm()}}
      onCancel={() => {onModalClose()}}
      cancelButtonLabel="Cancel"
      open={showModal}
    >
      <div>Please confirm the following commitment: </div>
      <ul>
        <li>Amount: {valueWithUnit(commitment.amount, unit)}</li>
        <li>Duration: {commitment.duration}</li>
      </ul>
    </Modal>
  );
};

export default CommitmentModal;
