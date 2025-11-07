// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { PopupMenuItem } from "@cloudoperators/juno-ui-components/index";
const MenuItemBuilder = (props) => {
  const { icon, text, callBack } = props;

  return (
    <PopupMenuItem
      onClick={() => {
        callBack();
      }}
      icon={icon}
      label={text}
    ></PopupMenuItem>
  );
};

export default MenuItemBuilder;
