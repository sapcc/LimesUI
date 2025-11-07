// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Modal, CodeBlock } from "@cloudoperators/juno-ui-components";

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
