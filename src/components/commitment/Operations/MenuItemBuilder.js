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
