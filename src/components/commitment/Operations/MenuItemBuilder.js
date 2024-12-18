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
import { MenuItem } from "@cloudoperators/juno-ui-components";
const MenuItemBuilder = (props) => {
  const { icon, text, callBack } = props;

  // TODO: Junos newest version breaks the old handling of the MenuItem. If children are delivered, it will always be treated as a uninteractable <div>. Listeners will be ignored.
  // As a workaround we comply to these changes and implement a workaround which results in icons to always have the default color. This means the Transfor icon won't be indicating in which state it is now.
  return (
    <MenuItem
      onClick={() => {
        callBack();
      }}
      icon={icon}
      label={text}
    ></MenuItem>
  );
};

export default MenuItemBuilder;
