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
import { Stack, Icon, MenuItem } from "@cloudoperators/juno-ui-components";
import { getChildrenOnDisplayName } from "../../../lib/builderUtils";

const MenuItemBuilder = ({ children, callBack }) => {
  const icon = getChildrenOnDisplayName(children, "Icon");
  const text = getChildrenOnDisplayName(children, "Text");

  return (
    <MenuItem
      onClick={() => {
        callBack();
      }}
    >
      <Stack alignment="center" gap="2">
        {icon}
        {text}
      </Stack>
    </MenuItem>
  );
};

const MenuIcon = ({ style, ...other }) => (
  <Icon size="16" {...style} {...other} />
);
MenuIcon.displayName = "Icon";
MenuItemBuilder.Icon = MenuIcon;

const MenuText = ({ children }) => <span>{children}</span>;
MenuText.displayName = "Text";
MenuItemBuilder.Text = MenuText;

export default MenuItemBuilder;
