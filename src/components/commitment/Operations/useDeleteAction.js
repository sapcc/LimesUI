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
      const menuItem = (
        <MenuItemBuilder callBack={onCommitmentDelete}>
          <MenuItemBuilder.Icon icon="cancel" title="Delete" />
          <MenuItemBuilder.Text>Delete</MenuItemBuilder.Text>
        </MenuItemBuilder>
      );
      const toolTip = "deletable";

      updateActions("delete", menuItem, toolTip);
    }
  }, [can_be_deleted]);
};

export default useDeleteAction;
