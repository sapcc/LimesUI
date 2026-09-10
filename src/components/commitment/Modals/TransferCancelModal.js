// SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import BaseModal from "./BaseComponents/BaseModal";
import BaseFooter from "./BaseComponents/BaseFooter";
import { TransferType } from "../../../lib/constants";

const TransferCancelModal = (props) => {
  const { commitment, title, startCommitmentTransfer, onModalClose } = props;

  async function onConfirm() {
    return startCommitmentTransfer(null, commitment, TransferType.NONE);
  }

  return (
    <BaseModal
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
    </BaseModal>
  );
};

export default TransferCancelModal;
