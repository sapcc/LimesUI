import React from "react";
import { Tabs, Tab, TabList, TabPanel, Container } from "juno-ui-components";
import useStore from "../../lib/store/store";
import { initialCommitmentObject } from "../../lib/store/store";

const AvailabilityZoneNav = (props) => {
  const setIsCommitting = useStore((state) => state.setIsCommitting);
  const setCommitment = useStore((state) => state.setCommitment);
  const azIndex = props.az.findIndex(
    (az) => az[0] === props.currentAZ && az[0] !== "unknown"
  );

  console.log(azIndex);
  return (
    <Container px={false} className="py-6">
      <Tabs selectedIndex={azIndex < 0 ? 0 : azIndex} onSelect={() => {}}>
        <TabList>
          {props.az.map(
            (az) =>
              az[0] !== "unknown" &&
              az[0] !== "any" && (
                <Tab
                  key={az}
                  onClick={() => {
                    props.setCurrentAZ(az[0]);
                    setIsCommitting(false);
                    setCommitment(initialCommitmentObject);
                  }}
                >
                  {az[0]}
                </Tab>
              )
          )}
        </TabList>
        {props.az.map(
          (az) =>
            az[0] !== "unknown" &&
            az[0] !== "any" && <TabPanel key={az[0]}></TabPanel>
        )}
      </Tabs>
    </Container>
  );
};

export default AvailabilityZoneNav;
