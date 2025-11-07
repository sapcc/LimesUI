// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import MenuItemBuilder from "./MenuItemBuilder";
import { TransferStatus } from "../../../lib/constants";
import { globalStore, createCommitmentStoreActions } from "../../StoreProvider";

const useTransferAction = (props) => {
  const { commitment, updateActions } = props;
  const { transfer_status: transferStatus } = commitment;
  const commitmentInTrasfer = transferStatus ? true : false;
  const { scope } = globalStore();
  const { setTransferredCommitment } = createCommitmentStoreActions();
  const { setTransferFromAndToProject } = createCommitmentStoreActions();

  function transferCommitment() {
    setTransferFromAndToProject(commitmentInTrasfer ? TransferStatus.VIEW : TransferStatus.START);
    setTransferredCommitment(commitment);
  }

  function cancelTransferCommitment() {
    setTransferFromAndToProject(TransferStatus.CANCEL);
    setTransferredCommitment(commitment);
  }

  React.useEffect(() => {
    const toolTip = commitmentInTrasfer ? "ready for transfer" : null;
    let transferText = commitmentInTrasfer ? "Transferring" : "Transfer";
    if (!scope.isProject() && !commitmentInTrasfer) {
      transferText = `${transferText} (Marketplace)`;
    }
    const menuItem = <MenuItemBuilder icon="upload" text={transferText} callBack={transferCommitment} />;
    updateActions("transfer", menuItem, toolTip);

    if (!commitmentInTrasfer) return;
    const cancelTransferMenuItem = (
      <MenuItemBuilder icon="close" text={"Cancel transfer"} callBack={cancelTransferCommitment} />
    );
    updateActions("cancel_transfer", cancelTransferMenuItem, null);
  }, [commitment, scope]);
};

export default useTransferAction;
