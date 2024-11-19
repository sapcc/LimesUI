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
import { parseCommitmentDuration } from "../../../lib/parseCommitmentDurations";

const useUpdateDurationAction = (props) => {
  const { commitment, resource, updateActions } = props;
  const commitmentDuration = commitment?.duration || null;
  const durations = resource?.commitment_config?.durations ?? [];
  const { setUpdateDurationCommitment } = createCommitmentStoreActions();
  const { addValidDuration } = createCommitmentStoreActions();

  const validDurations = React.useMemo(() => {
    return durations.filter(
      (duration) =>
        parseCommitmentDuration(duration) >
        parseCommitmentDuration(commitmentDuration)
    );
  }, [resource]);

  function updateDuration() {
    setUpdateDurationCommitment(commitment);
  }

  React.useEffect(() => {
    if (validDurations.length == 0) return;
    addValidDuration({ id: commitment.id, durations: validDurations });
    const menuItem = (
      <MenuItemBuilder callBack={updateDuration}>
        <MenuItemBuilder.Icon icon="edit" />
        <MenuItemBuilder.Text>Duration</MenuItemBuilder.Text>
      </MenuItemBuilder>
    );
    updateActions("durationUpdate", menuItem, null);
  }, [commitment]);
};

export default useUpdateDurationAction;
