// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

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
      const menuItem = <MenuItemBuilder icon="cancel" text="Delete" callBack={onCommitmentDelete} />;
      const toolTip = "deletable";

      updateActions("delete", menuItem, toolTip);
    }
  }, [can_be_deleted]);
};

export default useDeleteAction;
