import React from "react";
import MenuItemBuilder from "./MenuItemBuilder";
import { createCommitmentStoreActions } from "../../StoreProvider";

const useDeleteAction = (props) => {
  const { commitment, updateActions } = props;
  const { can_be_deleted } = commitment;
  const { setDeleteCommitment } = createCommitmentStoreActions();

  function onCommitmentDelete() {
    setDeleteCommitment(commitment);
  }

  React.useEffect(() => {
    if (can_be_deleted) {
      const menuItem = (
        <MenuItemBuilder callBack={onCommitmentDelete}>
          <MenuItemBuilder.Icon icon="cancel" title="Delete" />
          <MenuItemBuilder.Text>Delete</MenuItemBuilder.Text>
        </MenuItemBuilder>
      );
      const toolTip = "deletable";

      updateActions("delete", menuItem, toolTip);
    }
  }, [can_be_deleted]);
};

export default useDeleteAction;
