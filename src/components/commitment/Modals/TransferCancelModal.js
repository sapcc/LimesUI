// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Modal } from "@cloudoperators/juno-ui-components";
import BaseFooter from "./BaseComponents/BaseFooter";
import { TransferType } from "../../../lib/constants";

const TransferCancelModal = (props) => {
  const { commitment, title, startCommitmentTransfer, onModalClose } = props;

  async function onConfirm() {
    return startCommitmentTransfer(null, commitment, TransferType.NONE);
  }

  return (
    <Modal
      title={title}
      open={true}
      modalFooter={<BaseFooter onModalClose={onModalClose} guardFns={[]} actionFn={onConfirm} />}
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
