import React from "react";
import { TopNavigation, TopNavigationItem } from "juno-ui-components";
import useStore from "../../lib/store/store";
import { initialCommitmentObject } from "../../lib/store/store";

const AvailabilityZoneNav = (props) => {
  const setIsCommitting = useStore((state) => state.setIsCommitting);
  const setCommitment = useStore((state) => state.setCommitment);
  return (
    <TopNavigation>
      {Object.keys(props.az).map((az) => (
        <TopNavigationItem
          key={az}
          onClick={() => {
            props.setCurrentAZ(az);
            setIsCommitting(false);
            setCommitment(initialCommitmentObject);
          }}
          active={az === props.currentAZ}
        >
          {az}
        </TopNavigationItem>
      ))}
    </TopNavigation>
  );
};

export default AvailabilityZoneNav;
