/**
 * Copyright 2024 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import MenuItemBuilder from "./MenuItemBuilder";
import { TransferStatus } from "../../../lib/constants";
import { globalStore, createCommitmentStoreActions } from "../../StoreProvider";

const useTransferAction = (props) => {
  const { commitment, updateActions } = props;
  const commitmentInTrasfer = commitment.transfer_status ? true : false;
  const { scope } = globalStore();
  const { setTransferredCommitment } = createCommitmentStoreActions();
  const { setTransferFromAndToProject } = createCommitmentStoreActions();

  function transferCommitOnProjectLevel() {
    setTransferFromAndToProject(commitmentInTrasfer ? TransferStatus.VIEW : TransferStatus.START);
    setTransferredCommitment(commitment);
  }

  function cancelTransferCommitment() {
    setTransferFromAndToProject(TransferStatus.CANCEL);
    setTransferredCommitment(commitment);
  }

  React.useEffect(() => {
    if (!scope.isProject()) return;
    const menuItem = (
      <MenuItemBuilder
        icon="upload"
        text={commitmentInTrasfer ? "Transferring" : "Transfer"}
        callBack={transferCommitOnProjectLevel}
      />
    );
    let toolTip = null;
    if (commitmentInTrasfer) {
      toolTip = "ready for transfer";
    }
    updateActions("transfer", menuItem, toolTip);

    if (!commitmentInTrasfer) return;
    const cancelTransferMenuItem = (
      <MenuItemBuilder icon="close" text="Cancel transfer" callBack={cancelTransferCommitment} />
    );
    updateActions("cancel_transfer", cancelTransferMenuItem, null);
  }, [commitment, scope]);
};

export default useTransferAction;
