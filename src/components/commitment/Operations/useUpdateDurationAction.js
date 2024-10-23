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
    console.log("add")
    addValidDuration({ id: commitment.id, durations: validDurations });
    const menuItem = (
      <MenuItemBuilder callBack={updateDuration}>
        <MenuItemBuilder.Icon icon="edit" />
        <MenuItemBuilder.Text>Duration</MenuItemBuilder.Text>
      </MenuItemBuilder>
    );
    updateActions("updateDuration", menuItem, null);
  }, [commitment]);
};

export default useUpdateDurationAction;
