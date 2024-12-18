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
    const validFlavors = new RegExp("^instances_hana.").exec(resource_name)?.[0];
    if (!validFlavors) return;
    const menuItem = <MenuItemBuilder icon="edit" text="Convert" callBack={convertCommitment} />;
    updateActions("convert", menuItem, null);
  }, [resource_name, showConversionOption]);
};

export default useConversionAction;
