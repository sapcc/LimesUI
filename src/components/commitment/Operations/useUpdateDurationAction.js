import React from "react";
import MenuItemBuilder from "./MenuItemBuilder";
import { createCommitmentStoreActions } from "../../StoreProvider";

const useUpdateDurationAction = (props) => {
  const { commitment, updateActions } = props;
  const { setUpdateDurationCommitment } = createCommitmentStoreActions();

  function updateDuration() {
    setUpdateDurationCommitment(commitment);
  }

  React.useEffect(() => {
    const menuItem = (
      <MenuItemBuilder callBack={updateDuration}>
        <MenuItemBuilder.Icon icon="edit" />
        <MenuItemBuilder.Text>Duration</MenuItemBuilder.Text>
      </MenuItemBuilder>
    );
    updateActions("updateDuration", menuItem, null);
  }, [commitment]);
};

export default useUpdateDurationAction;
