// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import MenuItemBuilder from "./MenuItemBuilder";
import { TransferStatus, TransferType, TransferTypeTranslation } from "../../../lib/constants";
import { formatTime } from "../../../lib/utils";
import { useGlobalStore, createCommitmentStoreActions } from "../../StoreProvider";

const useTransferAction = (props) => {
  const { commitment, updateActions } = props;
  const { transfer_status: transferStatus } = commitment;
  const commitmentInTransfer = transferStatus ? true : false;
  const scope = useGlobalStore((state) => state.scope);
  const { setTransferredCommitment } = createCommitmentStoreActions();
  const { setTransferFromAndToProject } = createCommitmentStoreActions();

  function transferCommitment() {
    setTransferFromAndToProject(commitmentInTransfer ? TransferStatus.VIEW : TransferStatus.START);
    setTransferredCommitment(commitment);
  }

  function cancelTransferCommitment() {
    setTransferFromAndToProject(TransferStatus.CANCEL);
    setTransferredCommitment(commitment);
  }

  React.useEffect(() => {
    const toolTip = commitmentInTransfer ? (
      <span>
        ready for transfer ({TransferTypeTranslation[transferStatus]}) <br /> transfer start:{" "}
        {formatTime(commitment.transfer_started_at, "YYYY-MM-DD HH:mm A") || "N/A"}
      </span>
    ) : null;
    let transferText = commitmentInTransfer ? "Transferring" : "Transfer";
    if (!scope.isProject() && !commitmentInTransfer) {
      transferText = `${transferText} (${TransferTypeTranslation[TransferType.PUBLIC]})`;
    }
    const menuItem = <MenuItemBuilder icon="upload" text={transferText} callBack={transferCommitment} />;
    updateActions("transfer", menuItem, toolTip);

    if (commitmentInTransfer) {
      const transferStatusLabel = TransferTypeTranslation[transferStatus];
      const cancelTransferMenuItem = (
        <MenuItemBuilder
          icon="close"
          text={`Cancel transfer (${transferStatusLabel})`}
          callBack={cancelTransferCommitment}
        />
      );
      updateActions("cancel_transfer", cancelTransferMenuItem, null);
    } else {
      updateActions("cancel_transfer", null, null);
    }
  }, [commitment, scope]);
};

export default useTransferAction;
