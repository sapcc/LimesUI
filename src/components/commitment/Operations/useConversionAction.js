import React from "react";
import MenuItemBuilder from "./MenuItemBuilder";
import { createCommitmentStore, createCommitmentStoreActions } from "../../StoreProvider";

const useConversionAction = (props) => {
  const { commitment, updateActions } = props;
  const { resource_name } = commitment;
  const { showConversionOption } = createCommitmentStore();
  const { setConversionCommitment } = createCommitmentStoreActions();

  function convertCommitment() {
    setConversionCommitment(commitment);
  }

  React.useEffect(() => {
    if (!showConversionOption) return;
    const validFlavors = new RegExp("^instances_hana.").exec(
      resource_name
    )?.[0];
    if (!validFlavors) return;
    const menuItem = (
      <MenuItemBuilder callBack={convertCommitment}>
        <MenuItemBuilder.Icon icon="edit" title="Convert" />
        <MenuItemBuilder.Text>Convert</MenuItemBuilder.Text>
      </MenuItemBuilder>
    );
    updateActions("convert", menuItem, null);
  }, [resource_name, showConversionOption]);
};

export default useConversionAction;
