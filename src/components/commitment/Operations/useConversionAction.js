// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import MenuItemBuilder from "./MenuItemBuilder";
import { createCommitmentStoreActions, useCreateCommitmentStore } from "../../StoreProvider";

const useConversionAction = (props) => {
  const { commitment, marketplaceModalFn, updateActions } = props;
  const showConversionOption = useCreateCommitmentStore((state) => state.showConversionOption);
  const { setConversionCommitment } = createCommitmentStoreActions();

  function convertCommitment() {
    setConversionCommitment(commitment);
  }

  React.useEffect(() => {
    if (marketplaceModalFn) return;
    if (showConversionOption) {
      const menuItem = <MenuItemBuilder icon="edit" text="Convert" callBack={convertCommitment} />;
      updateActions("convert", menuItem, null);
    } else {
      updateActions("convert", null, null);
    }
  }, [showConversionOption]);
};

export default useConversionAction;
