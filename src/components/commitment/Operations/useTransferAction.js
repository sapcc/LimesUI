import React from "react";
import MenuItemBuilder from "./MenuItemBuilder";
import { TransferStatus } from "../../../lib/constants";
import { globalStore, createCommitmentStoreActions } from "../../StoreProvider";

const useTransferAction = (props) => {
  const { commitment, updateActions } = props;
  const commitmentInTrasfer = commitment.transfer_status ? true : false;
  const { confirmed_at: isConfirmed } = commitment;
  const { scope } = globalStore();
  const { setTransferredCommitment } = createCommitmentStoreActions();
  const { setTransferFromAndToProject } = createCommitmentStoreActions();

  function transferCommitOnProjectLevel() {
    setTransferFromAndToProject(
      commitmentInTrasfer ? TransferStatus.VIEW : TransferStatus.START
    );
    setTransferredCommitment(commitment);
  }

  React.useEffect(() => {
    if (scope?.isProject() && isConfirmed) {
      const menuItem = (
        <MenuItemBuilder callBack={transferCommitOnProjectLevel}>
          <MenuItemBuilder.Icon
            icon="upload"
            title="Transfer"
            color={
              commitmentInTrasfer ? "jn-text-theme-info" : "jn-global-text"
            }
          />
          <MenuItemBuilder.Text>Transfer</MenuItemBuilder.Text>
        </MenuItemBuilder>
      );
      let toolTip = null;
      if (commitmentInTrasfer) {
        toolTip = "ready for transfer";
      }
      updateActions("transfer", menuItem, toolTip);
    }
  }, [isConfirmed, scope]);
};

export default useTransferAction;
