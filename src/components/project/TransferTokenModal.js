import React from "react";
import { Modal, CodeBlock, Code } from "juno-ui-components";

const label = "font-semibold";

const TransferTokenModal = (props) => {
  const { commitment, title, onModalClose } = props;
  const token = commitment.transfer_token;

  return (
    <Modal
      title={title}
      open={true}
      onCancel={() => {
        onModalClose();
      }}
    >
      <div className={"mb-4 font-medium"}>
        <div>Copy this token.</div>
        <div>Enter it at the target project to receive the commitment.</div>
      </div>
      <CodeBlock className={"mb-4"} content={token} />
    </Modal>
  );
};

export default TransferTokenModal;
