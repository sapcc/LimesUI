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
