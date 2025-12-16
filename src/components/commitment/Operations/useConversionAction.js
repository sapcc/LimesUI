// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import MenuItemBuilder from "./MenuItemBuilder";
import { createCommitmentStore, createCommitmentStoreActions } from "../../StoreProvider";

const useConversionAction = (props) => {
  const { commitment, marketplaceModalFn, updateActions } = props;
  const { resource_name } = commitment;
  const { showConversionOption } = createCommitmentStore();
  const { setConversionCommitment } = createCommitmentStoreActions();

  function convertCommitment() {
    setConversionCommitment(commitment);
  }

  React.useEffect(() => {
    if (!showConversionOption || marketplaceModalFn) return;
    const validFlavors = new RegExp("^instances_hana.").exec(resource_name)?.[0];
    if (!validFlavors) return;
    const menuItem = <MenuItemBuilder icon="edit" text="Convert" callBack={convertCommitment} />;
    updateActions("convert", menuItem, null);
  }, [resource_name, showConversionOption]);
};

export default useConversionAction;
