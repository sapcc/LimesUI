import React from "react";
import { Tabs, Tab, TabList, TabPanel, Container } from "juno-ui-components";
import useStore from "../../lib/store/store";
import { initialCommitmentObject } from "../../lib/store/store";

const AvailabilityZoneNav = (props) => {
  const setIsCommitting = useStore((state) => state.setIsCommitting);
  const setCommitment = useStore((state) => state.setCommitment);
  const setToast = useStore((state) => state.setToast);
  const azIndex = props.az.findIndex((az) => az[0] === props.currentAZ);

  return (
    <Container px={false} className="py-6">
      <Tabs selectedIndex={azIndex} onSelect={() => {}}>
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
                    setToast(null);
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
