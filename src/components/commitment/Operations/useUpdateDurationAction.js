// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

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
      (duration) => parseCommitmentDuration(duration) > parseCommitmentDuration(commitmentDuration)
    );
  }, [resource]);

  function updateDuration() {
    setUpdateDurationCommitment(commitment);
  }

  React.useEffect(() => {
    if (validDurations.length == 0) return;
    addValidDuration({ id: commitment.id, durations: validDurations });
    const menuItem = <MenuItemBuilder icon="edit" text="Duration" callBack={updateDuration} />;
    updateActions("durationUpdate", menuItem, null);
  }, [commitment]);
};

export default useUpdateDurationAction;
