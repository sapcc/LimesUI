// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { PopupMenuItem } from "@cloudoperators/juno-ui-components/index";
import { useGlobalStore } from "../../StoreProvider";

const MenuItemBuilder = (props) => {
  const { icon, text, callBack } = props;
  const canEdit = useGlobalStore((state) => state.canEdit);

  return (
    <PopupMenuItem
      onClick={() => {
        if (!canEdit) return;
        callBack();
      }}
      icon={icon}
      label={text}
      disabled={!canEdit}
    ></PopupMenuItem>
  );
};

export default MenuItemBuilder;
